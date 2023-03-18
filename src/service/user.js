import axios from '../utils/axios.js'

export function login (params) {
  return axios.post('login', params)
}

export function getUserInfo (id) {
  return axios.get(`users/${id}`)
}
