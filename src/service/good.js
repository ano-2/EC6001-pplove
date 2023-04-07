import axios from '../utils/axios.js'

export function getGoods (params) {
  return axios.get('goods', { params })
}
// 获取商品分类
export function getCategories (params) {
  return axios.get('categories', { params })
}
// 获取产品细节
export function getProDetail (id) {
  return axios.get(`goods/${id}`)
}

// 编辑产品/帖子
export function editProduct (id, params) {
  return axios.put(`goods/${id}`, params)
}
