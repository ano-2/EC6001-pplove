<!-- eslint-disable vue/multi-word-component-names -->
<!--  -->
<template>
    <header class="home-header wrap" :class="{'active' : state.Scroll}">
        <router-link class="menu"  to="/category"><van-icon name="wap-nav" /></router-link>
        <div class="header-search">
            <span class="app-name">PPLove</span>
            <router-link to="/productList"  class="search-title">search in ppLove</router-link>
        </div>
        <router-link class="login"  to="./user"><van-icon name="manager-o" /></router-link>
    </header>
</template>

<script setup>

import { reactive } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

const state = reactive({
  Scroll: false // 滚动透明判断
})
// 滚动判断函数
const scrollFunc = function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  scrollTop > 100 ? state.Scroll = true : state.Scroll = false
}
document.addEventListener('scroll', scrollFunc)
onBeforeRouteLeave(() => {
  // 离开组件则消除监听
  document.removeEventListener('scroll', scrollFunc)
})
</script>
<style scoped lang='less'>
@import '@/common/style/mixin';

.home-header {
    position: fixed;
    .fj(); // display: flex; space between
    left: 0;
    top: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    z-index: 100;
    .boxSizing();// box-sizing: border-box;
    .menu,.login {
        color: @primary;
    }
    // 下滑滚动时 active
    &.active {
        background: @primary;
        .menu {
          color: #fff;
        }
        .login {
          color: #fff;
        }
    }
    .header-search{
        display: flex;
        width: 64%;
        line-height: 30px;
        margin: 10px 0;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.7);
        .app-name {
            padding: 0 15px;
            color: @primary;
            font-size: 20px;
            font-weight: bold;
        }
    }
    .van-icon-manager-o {
        font-size: 20px;
        vertical-align: -3px;
    }
    .van-icon-wap-nav {
        font-size: 20px;
        vertical-align: -3px;
    }

}
</style>
