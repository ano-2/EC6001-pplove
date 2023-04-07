import axios from '../utils/axios.js'

export function getOrders (params) {
  return axios.get('orders', { params })
}

export function createOrder (params) {
  return axios.post('orders', params)
}
