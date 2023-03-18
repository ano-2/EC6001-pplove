import axios from 'axios'
import { showFailToast } from 'vant'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '../router'

axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.defaults.baseURL = 'http://43.139.223.94:8889/api/private/v1/'
const instance = axios.create({
  timeout: 5000 // 请求超时时间 5s
})
// 发送request
// interceptors 请求拦截器 返回的数据response 拦截处理后返回

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = localStorage.getItem('token') || ''
    NProgress.start()
    return config
  },
  (error) => {
    showFailToast('服务端异常！' + error)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (res) => {
    if (res.data.meta.status === 400) {
      router.push({ path: '/login' })
      showFailToast({ duration: 3500, message: '未登录! Please login!' })
      // 返回 400 代表没有登录状态，路由跳转到/login 页面
      showFailToast('未登录！')
    }
    NProgress.done()
    return res
  },
  (error) => {
    showFailToast('服务端异常！' + error)
    // Do something with request error
    return Promise.reject(error)
  }
)
export default instance
