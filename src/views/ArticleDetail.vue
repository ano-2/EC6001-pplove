<!-- eslint-disable camelcase -->
<template>
  <div class="product-detail">
    <!-- 顶部导航栏 -->
    <van-nav-bar title='帖子内容' left-text="Back" left-arrow @click-left="goBack"/>
    <van-skeleton v-if="state.goodsDetail.length===0" avatar title :row="15" />
    <!-- 轮播图 -->
    <articleDetailSwipe :productSwipe="state.goodsDetail.pics"/>
    <!-- 产品内容 -->
    <articleDetailContent class="pro-detail-content" :product="state.goodsDetail"/>
    <!-- 回到顶部 -->
    <van-back-top right="5vw" bottom="12vh" class="back-top"/>
  </div>
</template>

<script setup>
import articleDetailSwipe from '@/components/Community/articleDetailSwipe.vue'
import articleDetailContent from '@/components/Community/articleDetailContent.vue'
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showFailToast } from 'vant'
import { getProDetail, editProduct } from '@/service/good.js'

const route = useRoute()
const router = useRouter()

const state = reactive({
  goodsDetail: []
})

const initProDetail = async () => {
  const { id } = route.params
  const { data: res } = await getProDetail(id)

  // console.log(res.data)
  if (res.meta.status === 200) {
    state.goodsDetail = res.data
    state.goodsDetail.goods_number += 1
    await editProduct(id, state.goodsDetail)
  } else {
    return showFailToast('获取失败')
  }
}
initProDetail()

// 顶部导航栏返回按钮
const goBack = () => {
  router.go(-1)
}

</script>

<style lang="less">
@import '../common/style/mixin';
.product-detail {
  overflow: scroll;
  width: 100vw;
}
</style>
