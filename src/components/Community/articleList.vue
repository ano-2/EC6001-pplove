<!-- eslint-disable vue/multi-word-component-names -->
<!--  -->
<template>
  <van-row v-if="productList.length+productList.length===0?false:true">
    <!-- 左 列 -->
    <van-col span="12">
      <div class="product-wrapper">
        <div class="product-item"  v-for="item in productList" :key="item.goods_id" @click="productDetail(item)">
          <van-image
            width="100%"
            fit="cover"
            position="center"
            :src="item.goods_big_logo"
          />
          <div class="item-info">
            <div class="goods-name van-multi-ellipsis--l2">{{ item.goods_name }}</div>
            <div class="prize-amount">
              <span class="amount van-multi-ellipsis--l2"> {{ JSON.parse(item.goods_editor).email  }}</span>
              <span class="amount"> <van-icon name="eye-o" />{{ item.goods_number }}</span>
            </div>
          </div>
        </div>
      </div>
    </van-col>
    <!-- 右  列 -->
    <van-col span="12">
      <div class="product-wrapper">
        <div class="product-item"  v-for="item in productList1" :key="item.goods_id" @click="productDetail(item)">
          <van-image
            width="100%"
            fit="cover"
            position="center"
            :src="item.goods_big_logo"
          />
          <div class="item-info">
            <div class="goods-name van-multi-ellipsis--l2">{{ item.goods_name }}</div>
            <div class="prize-amount ">
              <span class="amount van-multi-ellipsis--l2"> {{ JSON.parse(item.goods_editor).email  }}</span>
              <span class="amount"> <van-icon name="eye-o" />{{ item.goods_number }}</span>
            </div>
          </div>
        </div>
      </div>
    </van-col>
  </van-row>
  <!-- 数据加载时的兜底 -->
  <div v-else class="empty">
      <van-empty image="search" description="Found Nothing" />
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
    productList: Object,
    productList1: Object
  },
  setup () {
    const router = useRouter()
    // template要用的变量和函数return回去
    // 点击产品 进入产品详情
    const productDetail = (item) => {
      router.push({ path: `/articleDetail/${item.goods_id}` })
    }
    return {
      productDetail
    }
  }
})
</script>
<style scoped lang='less'>
@import '@/common/style/mixin';

.product-wrapper{
  .fj(space-evenly);
  flex-wrap: wrap;
  flex-direction: column;
  // 瀑布流
  // column-count: 2;
  // -webkit-column-count:2;
  // -moz-column-count:2;
  // column-gap: 5px;
  // break-inside: avoid;
  padding:10px 5px;

  // .wh(100%,100%);
  .product-item {
    break-inside: avoid;
    width: 98%;
    // height : 100%;
    .boxSizing();
    overflow: hidden;
    background : #fff;
    margin-bottom: 10px;
    .van-image{
      .borderRadius(12PX);
      overflow: hidden;
    }
    .item-info{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 65px;
      padding: 5px 10px 10px;
      .boxSizing();
      .goods-name{
        font-weight: bold;
      }
      .prize-amount{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        .amount{
          color: #969799;
        }
      }
    }
  }
}
.empty{
    text-align: center;
}
</style>
