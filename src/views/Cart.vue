<!-- eslint-disable vue/multi-word-component-names -->
<!--  -->
<template>
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="购物车"
      left-text="Back"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-empty image="error" description="购物车空空如也" />
    <navBar/>
</template>

<script setup>
import { useRouter } from 'vue-router'
import navBar from '@/components/NavBar.vue'
const router = useRouter()
const onClickLeft = () => {
  router.go(-1)
}
</script>
<style scoped lang='less'>

</style>
