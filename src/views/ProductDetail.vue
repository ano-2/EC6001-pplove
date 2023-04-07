<template>
  <div class="product-detail">
    <!-- 顶部导航栏 -->
    <van-nav-bar title='产品详情' left-text="Back" left-arrow @click-left="goBack"/>
    <van-skeleton v-if="state.goodsDetail.length===0" avatar title :row="15" />
    <!-- 轮播图 -->
    <ProDetailSwipe :productSwipe="state.goodsDetail.pics"/>
    <!-- 产品内容 -->
    <ProDetailContent class="pro-detail-content" :product="state.goodsDetail"/>
    <!-- 回到顶部 -->
    <van-back-top right="5vw" bottom="12vh" class="back-top"/>
    <!-- 底部操作栏 -->
    <div class="action-bar">
      <van-action-bar>
        <van-action-bar-icon icon="wap-home-o" to="/home"  text="主页" />
        <van-action-bar-icon icon="cart-o" :badge="cartItemCount" to="/cart" text="购物车" />
        <van-action-bar-button type="warning" @click="handleAddCart" text="加入购物车" />
      </van-action-bar>
    </div>
  </div>
</template>

<script setup>
import ProDetailSwipe from '@/components/Product/ProDetailSwipe.vue'
import ProDetailContent from '@/components/Product/ProDetailContent.vue'
import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showSuccessToast, showFailToast } from 'vant'
import { getProDetail } from '@/service/good.js'
// pinia购物车数据
import { useCartStore } from '@/stores/cart.js'
import { storeToRefs } from 'pinia'

// 初始化购物车
const route = useRoute()
const router = useRouter()
// 初始化pinia
const cart = useCartStore()
const { cartItems } = storeToRefs(cart)
const cartItemCount = computed(() => cartItems.value.length)
const state = reactive({
  goodsDetail: []
})

const initProDetail = async () => {
  const { id } = route.params
  const { data: res } = await getProDetail(id)

  // console.log(res.data)
  if (res.meta.status === 200) {
    state.goodsDetail = res.data
  } else {
    return showFailToast('获取失败')
  }
}
initProDetail()

// 顶部导航栏返回按钮
const goBack = () => {
  router.go(-1)
}
// 单机添加购物车
const handleAddCart = async () => {
  if (cartItemCount.value < 5) {
    cart.addItem({
      id: state.goodsDetail.goods_id,
      name: state.goodsDetail.goods_name,
      price: state.goodsDetail.goods_price,
      image: state.goodsDetail.goods_big_logo,
      count: 1
    })
    return showSuccessToast('加购成功,请到购物车下单')
  } else return showFailToast('购物车满啦，先去下单清空吧！')
}
// 点击购买
// const handleBuyNow = async () => {
//   showSuccessToast('功能开发中')
// }

</script>

<style lang="less">
@import '../common/style/mixin';
.product-detail {
  overflow: scroll;
  width: 100vw;

  // .van-action-bar-button--warning {
  //   // background: linear-gradient(to right,#9aa5cc, @primary)
  //   background: linear-gradient(to left,rgb(255, 202, 0), rgb(255, 152, 0));
  // }
  // .van-action-bar-button--danger {
  //   // background: linear-gradient(to right,#9aa5cc, @primary)
  //   background: linear-gradient(90deg, rgb(255, 119, 0), rgb(255, 73, 0));

  // }
}
</style>
