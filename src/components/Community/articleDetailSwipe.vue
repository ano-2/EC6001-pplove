<!-- eslint-disable vue/multi-word-component-names -->
<!--  -->
<template>
    <van-swipe class="my-swipe" lazy-render autoplay="false"  indicator-color="#053396">
      <van-swipe-item v-for="item in productSwipe" :key="item.pics_id">
        <van-image
          width="100%"
          fit="cover"
          position="center"
          :src="$filters.prefix(item.pics_big)"
        />
      </van-swipe-item>
      <template #indicator="{ active, total }">
        <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
      </template>
    </van-swipe>
</template>

<script>
import {
  defineComponent
} from 'vue'

export default defineComponent({
  components: {},
  props: {
    productSwipe: Object
  },
  setup () {
    // template要用的变量和函数return回去

    return {

    }
  }
})
</script>
<style scoped lang='less'>
.custom-indicator{
  position: absolute;
    right: 5px;
    bottom: 20px;
    padding: 2px 7px;
    font-size: 12px;
    color: #fff;
    background: rgba(5, 0, 0, 0.15);
    border-radius: 3px;

}
</style>
