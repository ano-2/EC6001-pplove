<!-- eslint-disable vue/multi-word-component-names -->
<!--  -->
<template>
  <!-- 顶部搜索栏 -->
  <div class="search-header">
    <div class="left-icon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-chongwu1"></use>
      </svg>
    </div>
    <van-search
    v-model="queryInfo.query"
    shape="round"
    placeholder="Search in Community"
    @search="onSearch"
    />
  </div>
  <!-- 文章分类Tabs -->
  <van-tabs animated swipeable>
    <van-tab title="全部">
    </van-tab>
    <van-tab title="官方活动"></van-tab>
    <van-tab title="社交聚会"></van-tab>
    <van-tab title="测评分享"></van-tab>
    <van-tab title="宠物知识"></van-tab>
    <van-tab title="配对"></van-tab>
  </van-tabs>
  <!-- 文章列表 -->
  <div class="product-list">
      <van-list
        v-model:loading="state.loading"
        :finished="state.finished"
        :finished-text="state.productList.length ? 'No more' : 'Search for the product you want'"
        @load="onLoad"
        @offset="0"
      >
        <articleList :productList1="state.productList1" :productList="state.productList"/>
      </van-list>
  </div>

  <!-- 发贴按钮 -->
  <div class="posting">
    <van-sticky>
      <van-button @click="showFailToast('功能暂不开放')" round color="rgba(5, 51, 150, .8)" type="primary" icon="edit"></van-button>
    </van-sticky>
  </div>
  <!-- 底部导航栏 -->
  <navBar/>
</template>

<script setup>

import navBar from '@/components/NavBar.vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getGoods } from '@/service/good.js'
import { showFailToast } from 'vant'
import articleList from '@/components/Community/articleList.vue'

const state = reactive({
// 产品列表
  productList: [],
  productList1: [],
  // 加载中标志位
  loading: false,
  // 加载结束标志位
  finished: false,
  totalPage: 1
})
const queryInfo = reactive({
  query: '',
  pagenum: 1,
  pagesize: 10,
  cat_two_id: 1564
  // cat_three_id: 1566 把cat two = null 则三级生效
})
const router = useRouter()

// 初始化函数
const init = async () => {
  getPrdList()
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

// 搜索按钮
const onSearch = async () => {
// 滚动至顶部
  const listScroll = document.querySelector('.product-list')
  listScroll.scrollTop = 0
  // 清除query参数
  router.push({ query: {} })
  queryInfo.cat_name = null
  queryInfo.cat_three_id = null

  queryInfo.pagenum = 1
  getPrdList()
}

// 滚动时触发请求数据
const scrollList = async () => {
// 有类别传参 则修改查询参数

  const { data: res } = await getGoods(queryInfo)
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
  if (queryInfo.pagenum >= state.totalPage) {
    state.finished = true
    return
  }

  if (queryInfo.pagenum < state.totalPage) {
    queryInfo.pagenum = queryInfo.pagenum + 1
  }
  scrollList()
}
</script>
<style scoped lang='less'>
.search-header{
  display: flex;
  justify-content: s;
  .left-icon{
    width: 30px;
    text-align: center;
    font-size: 25px;
    line-height: 56px;
  }
  .van-search{
    flex: 1;
  }
}
.product-list{
  height: calc(~"(100vh - 110px)");
  width: 100vw;
  background-color: #fff;
  //overflow: hidden;
  overflow-y: scroll;
}
.posting{
  position: absolute;
  left: 50%;
  bottom: 60px;
  transform: translateX(-50%);
}
</style>
