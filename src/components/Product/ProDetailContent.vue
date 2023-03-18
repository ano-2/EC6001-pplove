<!-- eslint-disable vue/multi-word-component-names -->
<!--  -->
<template>
<div class="product-content">
  <div class="product-info">
    <!-- prize color #e4393c -->
    <h1>￥{{ product.goods_price }}</h1>
    <van-tag color="#7232dd">PPlove</van-tag> 一站式爱宠好物
    <h2 class="van-multi-ellipsis--l2">{{ product.goods_name }}</h2>
  </div>
  <van-divider :style="{ color: '#053396', borderColor: '#053396', padding: '0 25px' }">
    Product Introduce
  </van-divider>
  <div class="product-introduce">
    <div
      v-html= "product.goods_introduce? marked.parse(product.goods_introduce):'<center><h3>No Data Available</h3></center>'">
    </div>
  </div>

</div>

</template>

<script setup>
import { toRefs } from 'vue'
import { marked } from 'marked'
const props = defineProps({
  product: Object
})
const { product } = toRefs(props)

</script>
<style scoped lang='less'>
@import '@/common/style/mixin';
.product-content{
  background-color: #f5f5f5;

 .product-info{
    transform: translateY(-15px);
    overflow: hidden;
    min-height: 155px;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    background: #fff;
    box-sizing: border-box;
    box-shadow: 0px -10px 10px -10px rgba(0,0,0,0.5);
    padding: 12px;
    h1{
      color: @prize;
      margin-block-start: 0 ;
    }
  }
  .product-introduce{
    box-sizing: border-box;
    background: #fff;
    padding: 10px 0 50px;

  }
}

.van-image {
  display: block;
}
</style>
