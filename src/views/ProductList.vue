<!-- eslint-disable camelcase -->
<!-- eslint-disable vue/multi-word-component-names -->
<!--  -->
<template>
    <!-- 顶部搜索栏 -->
    <div class="search-header">
      <div class="return" @click="onClickLeft">
        <van-icon name="arrow-left" size="20"/>
      </div>
      <van-search
      v-model="queryInfo.query"
      shape="round"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      />
      <div class="cart" @click="toCart">
        <van-icon name="shopping-cart-o" size="20" :badge="cartItemCount"/>
      </div>
    </div>

    <!-- 级联选择器 -->
    <van-field
      v-model="state.fieldValue"
      is-link
      readonly
      label="产品类别"
      placeholder="Select Product Categories"
      @click="state.cascaderShow = true"
    />
    <van-popup v-model:show="state.cascaderShow" round position="bottom">
      <van-cascader
        v-model="state.cascaderValue"
        title="Select Product Categories"
        :field-names="{ text: 'cat_name', value: 'cat_id', children: 'children' }"
        :options="state.cascaderOptions"
        @close="state.cascaderShow = false"
        @finish="onFinish"
      />
    </van-popup>

    <!-- 商品列表 -->
    <div class="product-list">
        <van-list
          v-model:loading="state.loading"
          :finished="state.finished"
          :finished-text="state.productList.length ? 'No more' : 'Search for the product you want'"
          @load="onLoad"
          @offset="0"
        >
          <ProList :productList1="state.productList1" :productList="state.productList"/>
        </van-list>
    </div>
    <!-- 底部导航栏 -->
    <navBar/>
</template>

<script setup>

import navBar from '@/components/NavBar.vue'
import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getGoods, getCategories } from '@/service/good.js'
import { showFailToast } from 'vant'
import ProList from '@/components/Product/ProList.vue'
import { useCartStore } from '@/stores/cart.js'
import { storeToRefs } from 'pinia'

const cart = useCartStore()
const { cartItems } = storeToRefs(cart)
const cartItemCount = computed(() => cartItems.value.length)
// import _ from 'lodash'
const state = reactive({
  // 产品列表
  productList: [],
  productList1: [],
  // 加载中标志位
  loading: false,
  // 加载结束标志位
  finished: false,
  totalPage: 1,
  // 级联选择器
  cascaderShow: false,
  fieldValue: '',
  cascaderValue: '',
  // 类别列表数据给级联选择器显示
  cascaderOptions: []
})
const queryInfo = reactive({
  query: '',
  pagenum: 1,
  pagesize: 10
})
// 获取路由传参
const route = useRoute()
const router = useRouter()

// 初始化函数
const init = async () => {
  // 有传参 则修改查询参数
  // const newQuery = _.cloneDeep(queryInfo)
  if (route.query.cat_name !== undefined) {
  // eslint-disable-next-line camelcase
    const { cat_id, cat_name } = route.query
    // eslint-disable-next-line camelcase
    queryInfo.cat_name = cat_name
    queryInfo.cat_three_id = Number(cat_id)
    state.fieldValue = `${queryInfo.cat_name}   （点击选择产品类别）`
  }
  getPrdList()
  getCate()
}
// 获取列表数据 传给级联选择器
const getCate = async () => {
  const cateInfo = {
    type: 3, // [1,2,3] 分类级别
    pagenum: 1,
    pagesize: 30
  }
  const { data: res } = await getCategories({ params: cateInfo })
  if (res.meta.status === 200) {
    state.cascaderOptions = res.data
  } else {
    return showFailToast('获取类别列表失败')
  }
}
const getPrdList = async () => {
  const { data: res } = await getGoods(queryInfo)
  state.finished = false
  if (res.meta.status === 200) {
    const arr = []
    const arr1 = []
    // eslint-disable-next-line array-callback-return
    res.data.goods.forEach((item, index) => {
      index % 2 === 0 ? arr.push(item) : arr1.push(item)
    })
    state.productList = arr
    state.productList1 = arr1
    state.totalPage = Math.ceil(res.data.total / queryInfo.pagesize)
    state.loading = false
    if (state.totalPage >= res.data.totalPage) state.finished = true
  } else {
    return showFailToast('获取失败')
  }
}
// 执行初始化函数 获得当前商品页面 渲染级联选择器数据(商品类别)
init()
// 级联选择器 选择回调
const onFinish = ({ selectedOptions }) => {
  // 清除query搜索参数 置pagenum为1否则因为瀑布流滚到下面页数不对
  queryInfo.query = ''
  queryInfo.pagenum = 1
  // 关闭级联框
  state.cascaderShow = false
  state.fieldValue = selectedOptions.map((option) => option.cat_name).join('/')
  // 传cat id和name给查询参数
  queryInfo.cat_name = selectedOptions[2].cat_name
  queryInfo.cat_three_id = selectedOptions[2].cat_id
  // console.log(queryInfo)
  getPrdList()
  // 滚动至顶部
  const listScroll = document.querySelector('.product-list')
  listScroll.scrollTop = 0
}

// 搜索按钮
const onSearch = async () => {
  // 滚动至顶部
  const listScroll = document.querySelector('.product-list')
  listScroll.scrollTop = 0
  // 清除query参数
  router.push({ query: {} })
  queryInfo.cat_name = null
  queryInfo.cat_three_id = null
  // 清除产品类别
  state.fieldValue = ''
  state.cascaderValue = ''
  queryInfo.pagenum = 1
  getPrdList()
}

// 滚动时触发请求数据
const scrollList = async () => {
  // 有类别传参 则修改查询参数
  if (route.query.cat_name !== undefined) {
  // eslint-disable-next-line camelcase
    const { cat_id, cat_name } = route.query
    // eslint-disable-next-line camelcase
    queryInfo.cat_name = cat_name
    queryInfo.cat_three_id = Number(cat_id)
  }
  const { data: res } = await getGoods(queryInfo)
  // 将产品图片赋值给logo
  // res.data.goods.forEach(async (item) => {
  //   const { data: detialRes } = await getProDetail(item.goods_id)
  //   if (detialRes.data.pics[0].pics_sma_url) {
  //     detialRes.data.goods_big_logo = detialRes.data.pics[0].pics_sma_url
  //     await editProduct(item.goods_id, detialRes.data)
  //   }
  //   if (detialRes.data.pics[0].pics_mid_url) {
  //     detialRes.data.goods_big_logo = detialRes.data.pics[0].pics_mid_url
  //     await editProduct(item.goods_id, detialRes.data)
  //   }
  // })
  //
  if (res.meta.status !== 200) { return showFailToast('获取失败') }
  state.totalPage = Math.ceil(res.data.total / queryInfo.pagesize)

  // eslint-disable-next-line array-callback-return
  res.data.goods.forEach((item, index) => {
    index % 2 === 0 ? state.productList.push(item) : state.productList1.push(item)
  })

  state.loading = false
  if (queryInfo.pagenum >= res.data.totalPage) state.finished = true
}
// 列表滚动到底部时 触发 请求下一页数据
const onLoad = () => {
  console.log('滚动开始')
  console.log(queryInfo.pagenum)
  console.log(state.totalPage)
  if (queryInfo.pagenum >= state.totalPage) {
    state.finished = true
    return
  }

  if (queryInfo.pagenum < state.totalPage) {
    queryInfo.pagenum = queryInfo.pagenum + 1
  }
  scrollList()
}
// 返回按钮
const onClickLeft = () => {
  router.go(-1)
}
// 购物车按钮
const toCart = () => {
  router.push({ path: '/cart' })
}
</script>
<style scoped lang='less'>
.search-header{
  display: flex;
  justify-content: space-around;
  align-items: center;
  .return{
    width: 25px;
    // text-align: center;
    // i{
    //   line-height: 56px;
    // }
  }
  .cart{
    width: 35px;
  }
  .van-search{
    flex: 1;
  }
}
.product-list{
  height: calc(~"(100vh - 150px)");
  width: 100vw;
  background-color: #f5f5f5;
  //overflow: hidden;
  overflow-y:visible;
  overflow-y: scroll;
  .van-list{
    height: calc(~"(100vh - 150px)");
  }
}

</style>
