<!-- eslint-disable vue/multi-word-component-names -->
<!--  -->
<template>
  <div class="cate-page">
    <!-- 顶部导航栏 -->
    <van-search
      v-model="queryInfo.query"
      shape="round"
      placeholder="请输入搜索关键词"
      @click="onClickSearch"
      />
    <!-- 左侧导航栏 -->
    <van-row>
      <van-col span="5">

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
import { ref, reactive, onMounted } from 'vue'
import { getCategories } from '@/service/good.js'
import { showFailToast } from 'vant'
import { useRouter } from 'vue-router'
const queryInfo = {
  type: 3, // [1,2,3] 分类级别
  pagenum: 1,
  pagesize: 30
}
const state = reactive({
  cateList: [],
  secondCate: null
})
const active = ref(0)
const init = async () => {
  const { data: res } = await getCategories({ params: queryInfo })
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
</script>
<style scoped lang='less'>

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
