<script setup>
import { RouterView } from 'vue-router'
// import axios from 'axios'
// const setToken = async () => {
//   const info = {
//     username: '57497740',
//     password: '57497740'
//   }
//   const { data: res } = await axios.post('http://43.139.223.94:8889/api/private/v1/login', info)
//   // console.log(res)
//   window.sessionStorage.setItem('token', res.data.token)
// }
// setToken() // 开发免登录用 后续删除
</script>

<template>
  <div id="app">
    <RouterView />

  </div>
</template>

<style lang="less" scoped>
#app {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
