<!-- eslint-disable vue/multi-word-component-names -->
<!--  -->
<template>
<div class="product-content">
  <div class="product-info">
    <van-tag color="#053396">PPlove</van-tag> <span>宠物社区 - 分享爱宠美好世界</span>
    <h2 class="van-multi-ellipsis--l2">{{ product.goods_name }}</h2>
    <div class="editor-view">
      <span> {{ product.goods_editor?JSON.parse(product.goods_editor).email:'匿名用户'  }}</span>
      <span class="amount"> <van-icon name="eye-o" />{{ product.goods_number }}</span>
    </div>
  </div>

  <div class="product-introduce">
    <div
      v-html= "product.goods_introduce? marked(product.goods_introduce):'<center><h3>No Data Available</h3></center>'">
    </div>
  </div>
  <!-- end 分隔线 -->
  <van-divider :style="{ color: '#053396', borderColor: '#053396', padding: '0 25px' }">
    End
  </van-divider>
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
    overflow: hidden;
    // min-height: 155px;
    // border-top-left-radius: 25px;
    // border-top-right-radius: 25px;
    background: #fff;
    box-sizing: border-box;
    margin-bottom: 15px;
    padding: 12px;
    .editor-view{
      display: flex;
      justify-content: space-between;
      align-content: center;
      span{
        line-height: 20px;
      }
    }
    .van-tag{
      color: #fff;
    }
    span{
      color: #777777;
    }
  }
  .product-introduce{
    box-sizing: border-box;
    background: #fff;
    padding: 10px;
  }
}

.van-image {
  display: block;
}
.van-divider{
  margin: 0;
}
</style>
