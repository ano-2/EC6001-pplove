<!-- eslint-disable vue/multi-word-component-names -->
<!--  -->
<template>
  <div class="nav-list">

      <van-grid :border="false" :column-num="5" center>
        <van-grid-item v-for="(item,index) in iconList" :key="index">
          <router-link :to="item.to" >
            <svg class="icon" aria-hidden="true"><use :xlink:href="item.icon"></use></svg>
            <p>{{ item.title }}</p>
          </router-link>
        </van-grid-item>
      </van-grid>

  </div>
</template>

<script setup>
const iconList = [
  {
    icon: '#icon-red-chongwuxizao',
    title: '幼宠养护',
    to: '/productList'
  },
  {
    icon: '#icon-chongwulianyi',
    title: '宠物配对',
    to: '/community'
  }, {
    icon: '#icon-chongwuhunpei',
    title: '婚庆',
    to: '/community'
  }, {
    icon: '#icon-chongwushibie',
    title: '健康鉴定',
    to: '/productList?cat_two_id=1552&cat_name=猫鉴定'
  }, {
    icon: '#icon-gengduo',
    title: 'More',
    to: '/category'
  },
  {
    icon: '#icon-red-chongwuxiujian',
    title: '修剪用品',
    to: '/productList'
  }, {
    icon: '#icon-chongwushipin',
    title: '大牌狗粮',
    to: '/productList?cat_two_id=1491&cat_name=犬糧'
  }, {
    icon: '#icon-1',
    title: '进口猫粮',
    to: '/productList?cat_two_id=1490&cat_name=貓糧'
  },
  {
    icon: '#icon-red-chongwufushi',
    title: '萌宠服饰',
    to: '/productList'
  }, {
    icon: '#icon-red-chongwugutou',
    title: '冻干零食',
    to: '/productList'
  }
]
</script>
<style scoped lang='less'>
@import '@/common/style/mixin';
.van-grid .van-grid-item {
  color: @primary;
}
.nav-list{
  text-align: center;
  p{
    margin-block-end: 0;
  }
  .icon{
    font-size: 35px;
  }
}
</style>
