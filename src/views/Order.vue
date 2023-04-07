<!-- eslint-disable vue/multi-word-component-names -->
<!--  -->
<template>
    <div class="order">
        <!-- 顶部导航栏 -->
        <van-nav-bar title='我的订单' left-text="个人中心" left-arrow @click-left="goBack"/>
        <!-- 订单状态tab -->
        <van-tabs class="order-tab" v-model="state.status">
            <van-tab title="全部" ></van-tab>
        </van-tabs>
        <!-- 订单列表 -->
        <div class="order-list">
          <van-list
          v-model:loading="state.loading"
          :finished="state.finished"
          finished-text="我也是有底线的"
          @load="onLoad"
          @offset="0">
            <!-- @click="goTo(item.orderNo)" -->
            <div v-for="(item, index) in state.orderList" :key="index" class="order-item-box" >
              <div class="order-item-header">
                <span>订单时间：{{ new Date(item.create_time*1000).toLocaleString() }}</span>
                <span><van-tag plain :type="item.pay_status==='0'?'primary':'success'">{{ item.pay_status==='0'?'未支付':'已支付' }}</van-tag></span>
              </div>
              <van-card
                v-for="good in item.goods"
                :key="good.goods_id"
                :num="good.goods_number"
                :price="good.goods_price"
                desc="Door-to-door service"
                :title="good.goods_name"
                :thumb="$filters.prefix(good.goods_logo)"
              />
              <div class="order-item-price">
                <span>总价 ￥{{ item.order_price }}</span>
              </div>
            </div>
          </van-list>
        </div>
    </div>

</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getOrders } from '@/service/order.js'
import { showFailToast } from 'vant'
const router = useRouter()
const state = reactive({
  // tab变量
  status: '',
  // list 控制参数
  loading: false,
  finished: false,
  // 订单列表数据
  orderList: [],
  // 总数据量
  totalPage: 0

})
// 查询订单参数
const queryInfo = reactive({
//   query: '',
  pagenum: 1,
  pagesize: 5,
  user_id: Number(localStorage.getItem('id'))
})
// 获取数据函数
const initOrder = async () => {
  // 这里 Tab 最好采用点击事件，@click，如果用 @change 事件，会默认进来执行一次。
  const { data: res } = await getOrders(queryInfo)
  console.log(res)
  if (res.meta.status === 200) {
    state.orderList = state.orderList.concat(res.data.orders)
    state.totalPage = Math.ceil(res.data.total / queryInfo.pagesize)
  } else {
    showFailToast(res.meta.msg)
  }
  state.loading = false
  if (queryInfo.pagenum >= state.totalPage) state.finished = true
}
// 滚动翻页触发函数
const onLoad = () => {
  // console.log('onLoad')
  if (queryInfo.pagenum < state.totalPage) {
    // console.log(queryInfo.pagenum)
    // console.log(state.totalPage)
    queryInfo.pagenum++
  }
  initOrder()
}
// 顶部导航栏返回按钮
const goBack = () => {
  router.push('/user')
}
</script>
<style scoped lang='less'>
.order{
  background-color: #f7f7f7;
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
  .van-card__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .order-item-box {
    margin: 15px 10px;
    background-color: #fff;
    overflow: hidden;
    border-radius: 10PX;
    .order-item-header {
      padding: 10px 20px 5px 20px;
      display: flex;
      justify-content: space-between;
    }
    .order-item-price{
      padding: 0 10px 10px 10px;
      display: flex;
      justify-content: end;
      font-size: 14px;
      font-weight: bold;
      color: #053396;
    }
    .van-card {
      background-color: #fff;
      margin-top: 0;
    }
  }
}
</style>
