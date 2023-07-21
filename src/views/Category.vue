<!-- eslint-disable vue/multi-word-component-names -->
<!--  -->
<template>
  <div class="cate-page">
    <!-- 顶部导航栏 -->
    <!-- <van-search
      v-model="queryInfo.query"
      shape="round"
      placeholder="请输入搜索关键词"
      @click="onClickSearch"
      /> -->
    <!-- 顶部搜索栏 -->
    <div class="search-header">
      <van-search
      v-model="queryInfo.query"
      shape="round"
      placeholder="请输入搜索关键词"
      @click="onClickSearch"
      />
      <div class="return" @click="toCart">
        <van-icon name="shopping-cart-o" size="20" :badge="cartItemCount"/>
      </div>
    </div>
    <!-- 左侧导航栏 -->
    <van-row>
      <van-col span="5">
        <van-sidebar v-model="active1">
          <van-sidebar-item title="全品类" to="/productList"></van-sidebar-item>
        </van-sidebar>
        <van-sidebar @change="handleSideChange()" v-model="active">
            <van-sidebar-item v-for="fstCat in state.cateList" :key="fstCat.cat_id" :title="fstCat.cat_name">
                <!-- <div v-for="secondCat in fstCat.children" :key="secondCat.cat_id">{{ secondCat.cat_name }}</div> -->
            </van-sidebar-item>

        </van-sidebar>

      </van-col>
      <!-- 右侧内容 -->
      <van-col span="19">
        <van-skeleton v-show="state.secondCate===null?true:false" title :row="7" />
        <CateList :cateData="state.secondCate"/>
      </van-col>
    </van-row>
  </div>
  <navBar/>
</template>

<script setup>
import CateList from '@/components/Category/CateList.vue'
import navBar from '@/components/NavBar.vue'
import { ref, reactive, onMounted, computed } from 'vue'
import { getCategories } from '@/service/good.js'
import { showFailToast } from 'vant'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart.js'
import { storeToRefs } from 'pinia'

const cart = useCartStore()
const { cartItems } = storeToRefs(cart)
const cartItemCount = computed(() => cartItems.value.length)
const queryInfo = {
  type: 3, // [1,2,3] 分类级别
  pagenum: 1,
  pagesize: 30
}
const state = reactive({
  cateList: [],
  secondCate: null
})
const active1 = ref(10)
const active = ref(0)
const init = async () => {
  const { data: res } = await getCategories({ params: queryInfo })
  // console.log(res.data)
  if (res.meta.status === 200) {
    state.cateList = res.data
    state.secondCate = res.data[0].children
  } else if (res.meta.status === 400) {
    router.push({ path: '/login' })
    return showFailToast('未登录！')
  } else {
    return showFailToast('获取失败')
  }
}

onMounted(() => {
  init()
})

// 侧边切换回调函数
const handleSideChange = () => {
  // 切换右侧内容
  state.secondCate = state.cateList[active.value].children
  // 滚动到顶部
  const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
  if (scrollHeight !== 0) {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    window.pageYOffset = 0
  }
}
const router = useRouter()
// 点击搜索框
const onClickSearch = () => {
  router.push({ path: '/productList' })
}
// 点击购物车按钮
const toCart = () => {
  router.push({ path: '/cart' })
}

</script>
<style scoped lang='less'>
@import '@/common/style/mixin';

.search-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background:  @primary;
  // color: aliceblue;
  .return{
    width: 35px;
    // text-align: center;
    // i{
    //   line-height: 56px;
    // }
  }
  .van-search{
    flex: 1;
    // background:  @primary;
  }
}
.cate-page{
  touch-action: pan-y;
}
.van-row{
  width: 100%;
  height: 90vh;
}
.van-col{
  height: 100%;
  padding-bottom:10px ;
  overflow-y: scroll;
}

// 左侧导航栏添加一个背景色
.van-col--5{
  background: var(--van-sidebar-background);
}
</style>
