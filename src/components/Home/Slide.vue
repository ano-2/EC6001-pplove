<!-- eslint-disable vue/multi-word-component-names -->
<!--  -->
<template>
  <div class="index-swipe"></div>
  <van-swipe class="my-swipe" lazy-render :autoplay="3000" indicator-color="#053396">
    <van-swipe-item v-for="(item, index) in homeSlide" :key="index">
      <!-- {{ item.url }} -->
      <van-image
        height="100%"
        fit="cover"
        position="top"
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
@import '@/common/style/mixin';
.index-swipe{
  width: 100%;
  position: absolute;
  height: 150px;
  border-bottom-left-radius: 45%;
  border-bottom-right-radius: 45%;
  background: @primary;
}
.my-swipe{
  box-sizing: border-box;
  margin: 50px 10px 0;
  height: 160px;
  overflow: hidden;
  border-radius: 10PX;
  & .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 200px;
    text-align: center;
  }
}
</style>
