<!-- eslint-disable vue/multi-word-component-names -->
<!--  -->
<template>
  <div class="cart-box">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="购物车"
      left-text="Back"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="cart-body" v-if="length">
      <van-checkbox-group @change="toggleChecked()" v-model="checkedItems">
        <van-swipe-cell :right-width="50" v-for="(item, index) in cartItems" :key="index">
          <div class="good-item">
            <van-checkbox
            :name="item.id"
            :checked="checkedItems.includes(item.id)"
            />
            <div class="good-img"><img :src="$filters.prefix(item.image)" alt=""></div>
            <div class="good-desc">
              <div class="good-title">
                <span>{{ item.name }}</span>
                <span>x{{ item.count }}</span>
              </div>
              <div class="good-btn">
                <div class="price">¥{{ item.price }}</div>
                <van-stepper
                  integer
                  :min="1"
                  :max="5"
                  v-model="item.count"
                  :name="item.id"
                  async-change
                  @change="onChange"
                />
              </div>
            </div>
          </div>
          <template #right>
            <van-button
              square
              icon="delete"
              type="danger"
              class="delete-button"
              @click="deleteGood(item.id)"
            />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
    </div>
    <van-submit-bar
      v-if="length"
      class="submit-all van-hairline--top"
      :price="totalPrice"
      button-text="结算"
      button-type="primary"
      @submit="toCreateOrder"
    >
      <van-checkbox v-model="allChecked" v-if="length">全选</van-checkbox>
    </van-submit-bar>
    <div class="empty" v-if="!length">
      <van-empty
        image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
        image-size="100"
      />
      <div class="title">挑点喜欢的放进购物车</div>
      <van-button round type="primary" @click="goShop" block>Buy Now</van-button>
    </div>
    <navBar/>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import navBar from '@/components/NavBar.vue'
import { useCartStore } from '@/stores/cart.js'
import { storeToRefs } from 'pinia'
import { showFailToast } from 'vant'

const router = useRouter()
const cart = useCartStore()

const { cartItems } = storeToRefs(cart)

const length = computed(() => cartItems.value.length)
// watchEffect(() => {
//   console.log(length.value)
// })
// 复选框
const checkedItems = ref([])
// 复选框改变
function toggleChecked () {
  cartItems.value.forEach((i) => {
    i.checked = checkedItems.value.indexOf(i.id) !== -1
  })
  // item.checked = !item.checked
  // if (cartItems.value.every((item) => !item.checked)) {
  //   allChecked.value = false
  // } else {
  //   allChecked.value = cartItems.value.every((item) => item.checked)
  // }
}

// 计算总价 解决复选状态删除商品 DOM元素不更新的bug
const totalPrice = computed(() => {
  let total = 0
  cartItems.value.forEach((item) => {
    if (item.checked) {
      total = total + item.price * item.count * 100
    }
  })
  return total
})

// function calculateTotalPrice () {
//   return checkedItems.value
//     .map((itemId) => cartItems.value.find((item) => item.id === itemId))
//     .reduce((total, item) => total + item.price * item.count * 100, 0)
// }

// 全选
const allChecked = computed({
  get: () => cartItems.value.every((item) => item.checked),
  set: (value) => {
    checkedItems.value = value ? cartItems.value.map((item) => item.id) : []
    cartItems.value.forEach((item) => {
      item.checked = value
    })
  },
  initial: false
})

function onChange (item) {
  cart.updateItemCount(item)
}
// 结算
function toCreateOrder () {
  checkedItems.value.length === 0 ? showFailToast('先选择商品再结算') : router.push({ path: '/createOrder' })
  // cart.creatOrder()
  // console.log(cartItems)
}
// 左滑删除购物车商品
async function deleteGood (itemId) {
  checkedItems.value = checkedItems.value.filter((i) => i.id !== itemId)
  await nextTick() // 此时DOM已更新
  cart.deletItem(itemId)
}

const onClickLeft = () => {
  router.go(-1)
}
const goShop = () => {
  router.push({ path: '/productList' })
}

</script>

<style lang="less">
  @import '../common/style/mixin';
  .cart-box {
    .cart-header {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10000;
      .fj();
      .wh(100%, 44px);
      line-height: 44px;
      padding: 0 10px;
      .boxSizing();
      color: #252525;
      background: #fff;
      border-bottom: 1px solid #dcdcdc;
      .cart-name {
        font-size: 14px;
      }
    }
    .cart-body {
      margin: 16px 0 100px 0;
      padding-left: 10px;
      .good-item {
        display: flex;
        margin: 10px 0;
        .van-checkbox{
          margin-right: 5px;
        }
        .good-img {
          img {
            .wh(100px, 100px);
            border-radius:5PX;
          }
        }
        .good-desc {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          padding: 20px;
          .good-title {
            display: flex;
            justify-content: space-between;
          }
          .good-btn {
            display: flex;
            justify-content: space-between;
            .price {
              font-size: 16px;
              color: red;
              line-height: 28px;
            }
            .van-icon-delete {
              font-size: 20px;
              margin-top: 4px;
            }
          }
        }
      }
      .delete-button {
        width: 50px;
        height: 100%;
      }
    }
    .empty {
      width: 50%;
      margin: 0 auto;
      text-align: center;
      margin-top: 200px;
      .empty-cart {
        width: 150px;
        margin-bottom: 20px;
      }
      .van-icon-smile-o {
        font-size: 50px;
      }
      .title {
        font-size: 16px;
        margin-bottom: 20px;
      }
    }
    .submit-all {
      margin-bottom: 50px;
      .van-checkbox {
        margin-left: 10px
      }
      .van-submit-bar__text {
        margin-right: 10px
      }
      .van-submit-bar__button {
        background: @primary;
      }
    }
    .van-checkbox__icon--checked .van-icon {
      background-color: @primary;
      border-color: @primary;
    }
  }
</style>
