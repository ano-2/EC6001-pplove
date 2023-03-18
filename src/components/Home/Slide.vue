<!-- eslint-disable vue/multi-word-component-names -->
<!--  -->
<template>
  <van-swipe class="my-swipe" lazy-render :autoplay="3000" indicator-color="#1baeae">
    <van-swipe-item v-for="(item, index) in homeSlide" :key="index">
      <!-- {{ item.url }} -->
      <van-image
        height="100%"
        fit="cover"
        position="bottom"
        :src="item.url"
      />
    </van-swipe-item>
  </van-swipe>
</template>

<script setup>
import { reactive } from 'vue'
const homeSlide = reactive([
  { url: 'http://43.139.223.94:8889/tmp_uploads/statics/800x.webp' },
  { url: 'http://43.139.223.94:8889/tmp_uploads/statics/800x(1).webp' },
  { url: 'http://43.139.223.94:8889/tmp_uploads/statics/1200x.webp' },
  { url: 'http://43.139.223.94:8889/tmp_uploads/statics/1200x(2).webp' },
  { url: 'http://43.139.223.94:8889/tmp_uploads/statics/Pets Identification.webp' }
])
</script>
<style scoped lang='less'>
.my-swipe{
  width: 100%;
  height: 220px;
  & .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 200px;
    text-align: center;
  }
}
</style>
