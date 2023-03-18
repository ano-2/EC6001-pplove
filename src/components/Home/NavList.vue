<!-- eslint-disable vue/multi-word-component-names -->
<!--  -->
<template>
  <div class="nav-list">
    <router-link to="/productList" >
      <van-grid :border="false" :column-num="4" >
        <van-grid-item v-for="(item,index) in iconList" :key="index">
          <svg class="icon" aria-hidden="true"><use :xlink:href="item.icon"></use></svg>
          <p>{{ item.title }}</p>
        </van-grid-item>
      </van-grid>
    </router-link>
  </div>
</template>

<script setup>
const iconList = [
  {
    icon: '#icon-red-chongwuxiujian',
    title: '修剪用品'
  }, {
    icon: '#icon-chongwushipin',
    title: '大牌狗粮'
  }, {
    icon: '#icon-1',
    title: '进口猫粮'
  }, {
    icon: '#icon-red-chongwuxizao',
    title: '宠物洗护'
  }, {
    icon: '#icon-red-chongwufushi',
    title: '萌宠服饰'
  }, {
    icon: '#icon-red-chongwugutou',
    title: '冻干零食'
  }, {
    icon: '#icon-chongwulianyi',
    title: '宠物联谊'
  }, {
    icon: '#icon-_shequluntan',
    title: '社区'
  }
]
</script>
<style scoped lang='less'>
@import '@/common/style/mixin';
.van-grid .van-grid-item {
  color: @primary;
}
.nav-list{
  p{
    margin-block-end: 0;
  }
  .icon{
    font-size: 35px;
  }
}
</style>
