import { defineStore } from 'pinia'
import { ref } from 'vue'
import { showSuccessToast } from 'vant'
export const useCartStore = defineStore({
  id: 'cart',

  state: () => ({
    cartItems: ref([
      // {
      //   id: 1,
      //   name: 'Product 1',
      //   price: 10,
      //   image: 'https://picsum.photos/200/200',
      //   count: 1,
      //   checked: true
      // }
    ])
  }),

  getters: {
  },

  actions: {
    addItem (item) {
      const existingItem = this.cartItems.find((i) => i.id === item.id)
      if (existingItem) {
        existingItem.count++
        showSuccessToast('加购成功,商品已存在')
      } else {
        this.cartItems.push({
          ...item,
          count: 1,
          checked: false // 设置默认的 checked 属性值为 false
        })
      }
    },
    // 更新商品数量
    updateItemCount (item) {
      console.log(item)
      const existingItem = this.cartItems.find((i) => i.id === item.id)

      if (existingItem) {
        existingItem.count += item.count
      }
    },
    // 下单
    creatOrder () {
      // console.log(this.cartItems)
      this.cartItems = this.cartItems.filter((i) =>
        i.checked !== true)
      // const existingItem = this.cartItems.filter((i) => {
      //   return i.checked === true
      // })
      // console.log(existingItem)
      // existingItem.forEach(i => {
      //   this.deletItem(i.id)
      // })
    },
    // 下单
    deletItem (itemId) {
      // splice改变原数组
      this.cartItems = this.cartItems.filter((i) =>
        i.id !== itemId)
      // this.cartItems.splice()
    }

  }
})
