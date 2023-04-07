import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'
import {
  Button, Swipe, SwipeCell, SwipeItem, Empty, Sidebar, SidebarItem, Col, Row, Skeleton, Toast
  , PullRefresh, List, Card, Cascader, ActionBar, ActionBarIcon, ActionBarButton, BackTop,
  CellGroup, Field, Tab, Tabs
} from 'vant'

import 'lib-flexible/flexible' // 自动媒体查询改变 root font size

import 'vant/es/toast/style' // toast没样式

import '@/common/style/theme.css'
// 入全局可用阿里图标 样式文件 js文件
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(Button)
  .use(SwipeCell)
  .use(Swipe)
  .use(SwipeItem)
  .use(Empty)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Col)
  .use(Row)
  .use(Skeleton)
  .use(Toast)
  .use(PullRefresh)
  .use(List)
  .use(Card)
  .use(Cascader)
  .use(ActionBar)
  .use(ActionBarIcon)
  .use(ActionBarButton)
  .use(BackTop)
  .use(CellGroup)
  .use(Field)
  .use(Tab)
  .use(Tabs)
// 全局过滤器
app.config.globalProperties.$filters = {
  prefix (url) {
    if (url && url.startsWith('http')) {
      return url
    } else {
      url = `http://43.139.223.94:8889${url}`
      return url
    }
  }
}
// 挂载vue实例
app.mount('#app')
