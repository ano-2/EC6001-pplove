<template>
  <div class="nav-bar">
    <ul class="nav-list">
      <router-link  class="nav-list-item" to="home">
        <van-icon name="wap-home" />
        <span>首页</span>
      </router-link>
      <router-link class="nav-list-item" to="category">
        <van-icon name="shop" />
        <span>商城</span>
      </router-link>
      <router-link class="nav-list-item" to="community">
        <van-icon name="smile-comment-o" />
        <span>社区</span>
      </router-link>
      <!-- <router-link  class="nav-list-item" to="cart">
        <i><van-icon  name="shopping-cart-o" :badge="cartItemCount"/></i>
        <span>购物车</span>
      </router-link> -->
      <router-link  class="nav-list-item" to="user">
        <van-icon name="manager" />
        <span>我的</span>
      </router-link>
    </ul>
  </div>
</template>
<script setup>
// import { computed } from 'vue'
// import { useCartStore } from '@/stores/cart.js'
// import { storeToRefs } from 'pinia'

// const cart = useCartStore()
// const { cartItems } = storeToRefs(cart)
// const cartItemCount = computed(() => cartItems.value.length)

</script>
<style lang="less" scoped >
@import '@/common/style/mixin';
.nav-bar{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 5px 0;
  z-index: 1000;
  background: #fff;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  box-shadow: 0px -5px 15px -10px rgba(0,0,0,0.5);
  .nav-list {
    width: 100%;
    .fj();
    flex-direction: row;
    padding: 0;
    .nav-list-item {
      display: flex;
      flex: 1;
      flex-direction: column;
      text-align: center;
      color: #666;
      // router link 激活颜色改变
      &.active{
        color: @primary;
        transform: translateY(-4px);
        font-weight: bold;
        }
      i {
        text-align: center;
        font-size: 22px;
      }
      span{
        font-size: 12px;
      }
    }
  }
}
</style>
