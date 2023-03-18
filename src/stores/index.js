import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUsersStore = defineStore('pplove', {
  // 其它配置项
  state: () => {
    return {
      headerActive: ref(false)
    }
  },
  actions: {
    setheaderActive (value) {
      this.headerActive = value
    }
  }
})
