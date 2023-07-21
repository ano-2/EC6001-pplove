<!-- eslint-disable vue/multi-word-component-names -->
<!--  -->
<template>
    <div class="cate-list">
        <div class="cate-item" v-for="fist in cateData" :key="fist.cat_id">
            <h4>{{ fist.cat_name }}</h4>
            <van-grid :clickable="true" :border="false">
                <van-grid-item icon="photo-o" dot @click="clickOneCate(fist)" :text="fist.cat_name" />
            </van-grid>
            <van-grid  :column-num="4" :clickable="true" :border="false">
                <van-grid-item v-for="item in fist.children" :key="item.cat_id"  @click="clickCate(item)" :text="item.cat_name" />
            </van-grid>
        </div>
    </div>

</template>

<script>
import {
  defineComponent
} from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {},
  props: {
    cateData: Object
  },
  setup () {
    const router = useRouter()
    const clickOneCate = (item) => {
      // console.log(item)
      router.push({ path: '/productList', query: { cat_two_id: item.cat_id, cat_name: item.cat_name } })
    }
    const clickCate = (item) => {
      // console.log(item)
      router.push({ path: '/productList', query: { cat_three_id: item.cat_id, cat_name: item.cat_name } })
    }
    // template要用的变量和函数return回去
    return {
      clickCate,
      clickOneCate
    }
  }
})
</script>
<style scoped lang='less'>
.cate-list{
    height: 100%;
    padding: 0 12px ; // 上0 左右12px 下50(和导航栏一样)
    box-sizing: border-box;
    overflow-y: scroll;
    touch-action: pan-y; // 启用单指垂直平移手势 none是禁止缩放

}
</style>
