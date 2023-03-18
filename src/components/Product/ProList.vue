<!-- eslint-disable vue/multi-word-component-names -->
<!--  -->
<template>
  <div v-if="productList.length" class="product-wrapper">
    <!-- item 1 -->
    <div class="product-item">
      <van-image
        width="100%"
        fit="cover"
        position="center"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
      <div class="item-info">
        <div class="goods-name van-multi-ellipsis--l2">三花猫</div>
        <div class="prize-amount">
          <span class="prize">￥ 339</span>
          <span class="amount"> x69</span>
        </div>
      </div>
    </div>
    <!-- item 2 -->
    <div class="product-item">
      <van-image
        width="100%"
        fit="cover"
        position="center"
        src='https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg'
      />
      <div class="item-info">
        <div class="goods-name van-multi-ellipsis--l2">Apple Macbook Air 256G 13.3 2023款</div>
        <div class="prize-amount">
          <span class="prize">￥ 6999</span>
          <span class="amount"> x9</span>
        </div>
      </div>
    </div>
    <!-- item for in productList -->
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
          <span class="prize">￥ {{ item.goods_price }}</span>
          <span class="amount"> x{{ item.goods_number }}</span>
        </div>
      </div>
    </div>
  </div>
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
    productList: Object
  },
  setup () {
    const router = useRouter()
    // template要用的变量和函数return回去
    // 点击产品 进入产品详情
    const productDetail = (item) => {
      router.push({ path: `/productDetail/${item.goods_id}` })
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
  // .fj(space-evenly);
  // flex-wrap: wrap;
  // flex-direction: column;
  // 瀑布流
  column-count: 2;
  -webkit-column-count:2;
  -moz-column-count:2;
  column-gap: 5px;
  padding:10px 5px;
  break-inside: avoid;
  // .wh(100%,100%);
  .product-item {
    break-inside: avoid;
    width: 98%;
    height : 100%;
    .boxSizing();
    .borderRadius(15PX);
    overflow: hidden;
    background : #fff;
    margin-bottom: 10px;
    .item-info{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 80px;
      padding: 5px 10px 10px;
      .boxSizing();
      .goods-name{
        font-weight: bold;
      }
      .prize-amount{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .prize{
          color: @prize;
          font-size: 15px;
          font-weight: bold;
        }
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
