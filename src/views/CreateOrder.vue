<!-- eslint-disable vue/multi-word-component-names -->
<!--  -->
<template>
  <!-- 顶部导航栏 -->
  <van-nav-bar
    title="生成订单"
    left-text="Back"
    left-arrow
    @click-left="onClickLeft"
  />
  <div class="order-detail">
    <van-card
      v-for="good in state.orderGoods"
      :key="good.id"
      :num="good.count"
      :price="good.price"
      desc="Door-to-door service"
      :title="good.name"
      :thumb="$filters.prefix(good.image)"
    />
  </div>
  <!-- 结算bar -->
  <van-submit-bar
    class="submit-all van-hairline--top"
    :price="totalPrice"
    button-text="下单"
    text-align="left"
    button-type="primary"
    @submit="clickCreateOrder">
  </van-submit-bar>
  <!-- 支付弹出框 -->
  <van-popup
    closeable
    round
    :close-on-click-overlay="false"
    v-model:show="state.showPay"
    position="bottom"
    :style="{ height: '45%' }"
    @close="closePay">
      <div class="pay-popup">
        <van-button @click="payOrder(2)" color="rgb(0, 159, 232)" block plain>
          <div class="btn-content">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zhifubaozhifu"></use>
            </svg> <span>支付宝支付</span>
          </div>
        </van-button>
        <van-button @click="payOrder(3)" color="#4fc08d" block plain>
          <div class="btn-content">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-weixinzhifu"></use>
            </svg> <span>微信支付</span>
          </div>
        </van-button>
        <van-button @click="payOrder(4)" type="default" block >
          <div class="btn-content">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zhifupingtai-master"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon_zhifuvisa"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zhifupingtai-yinlian"></use>
            </svg> <span>银行卡支付</span>
          </div>
        </van-button>
      </div>
  </van-popup>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { showFailToast, showLoadingToast, showToast } from 'vant'
import { useCartStore } from '@/stores/cart.js'
import { storeToRefs } from 'pinia'
import { reactive, computed } from 'vue'
import { createOrder } from '@/service/order.js'
import _ from 'lodash'
// pinia 实例化
const cart = useCartStore()
const { cartItems } = storeToRefs(cart)
// router
const router = useRouter()
const state = reactive({
  orderGoods: [],
  showPay: false,
  orderInfo: {}
})

const totalPrice = computed(() => {
  let total = 0
  cartItems.value.forEach((item) => {
    if (item.checked) {
      state.orderGoods.push(item)
      total = total + item.price * item.count * 100 // 组件订单金额1000展示10.00所以要*100
    }
  })
  return total
})
// 订单信息参数赋值、发axios请求
const doCreateOrder = async (payType) => {
  // userid 下单用户的id
  state.orderInfo.user_id = Number(localStorage.getItem('id'))
  // 总价 从计算属性取 记得/100
  state.orderInfo.order_price = _.cloneDeep(totalPrice.value) / 100
  // order_pay 支付方式 0 未支付 1 支付宝 2 微信 3 银行卡
  // console.log(payType === undefined ? 0 : payType)
  // console.log(payType)
  state.orderInfo.order_pay = (payType === undefined ? 0 : payType)
  // pay_status 支付状态 0 未支付 1 已支付
  // state.orderInfo.pay_status = payType === 0 ? 0 : 1
  // 订单货物处理 orderGoods
  const goods = []
  state.orderGoods.forEach(item => {
    const goodItem = {}
    goodItem.goods_id = item.id
    goodItem.goods_name = item.name
    goodItem.goods_price = item.price
    goodItem.goods_number = item.count
    goodItem.goods_logo = item.image
    goods.push(goodItem)
  })
  state.orderInfo.goods = goods
  console.log(state.orderInfo)
  // 创建订单
  const { data: res } = await createOrder(state.orderInfo)
  if (res.meta.status === 201) {
    console.log(res)
    router.replace('/order')
  } else {
    showFailToast(res.meta.msg)
  }
}
// 点击创建订单按钮
const clickCreateOrder = () => {
  showLoadingToast({
    message: '订单创建中...',
    forbidClick: false,
    duration: 1000,
    overlay: true
  })
  setTimeout(() => {
    state.showPay = true
  }, 1000)
}

// 点击返回取消订单
const onClickLeft = () => {
  showFailToast('您已取消订单')
  router.push('/cart')
}
// 支付订单
const payOrder = (payType) => {
  showLoadingToast({
    message: '支付中...',
    forbidClick: false,
    duration: 900,
    overlay: true
  })
  setTimeout(() => {
    doCreateOrder(payType)
    cart.creatOrder()
  }, 1000)
}
// 关闭支付弹窗
const closePay = () => {
  showToast('你取消了支付！')
  doCreateOrder()
  cart.creatOrder()
}
</script>
<style scoped lang='less'>
.order-detail{
  height: calc(~"(100vh - 50px)");
  background-color: #f7f7f7;
  padding: 20px 0;
  box-sizing: border-box;
}
.van-card {
  background-color: #fff;
  margin-bottom: 10px;
}
.pay-popup{
  width: 90%;
  margin: 0 auto;
  padding: 60px 0;
  .van-button{
    margin-bottom: 10px;
    // --van-button-border-width:2px;
    .btn-content{
      display: flex;
      align-items: center;
    }
    .icon{
      font-size: 22px;
      margin-right: 5px;
    }
  }
}
</style>
