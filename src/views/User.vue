<!-- eslint-disable vue/multi-word-component-names -->
<!--  -->
<template>
    <div class="user">
      <!-- 顶部导航栏 -->
      <van-nav-bar title="个人中心" :safe-area-inset-top="true"/>
      <van-skeleton title :avatar="true" :row="3" :loading="state.userInfo.length===0?true:false">
        <div class="user-info">
            <div class="info">
                <img src="https://s.yezgea02.com/1604040746310/aaaddd.png"/>
                <div class="user-desc">
                    <span>{{ state.userInfo.email }}</span>
                    <span>{{ state.userInfo.username }}</span>
                    <span class="name">{{ state.userInfo.mobile }}</span>
                </div>
            </div>
        </div>
      </van-skeleton>
      <div class="user-contain">
        <!-- user-order -->
        <div class="user-order">
            <van-cell-group inset>
                <van-cell title="我的订单" to="/order"  is-link/>
                <van-cell to="/order">
                  <van-grid :border="false"  :column-num="3">
                    <van-grid-item v-for="(item,index) in orderIcon" :key="index">
                      <svg class="icon" aria-hidden="true"><use :xlink:href="item.icon"></use></svg>
                      <p>{{ item.title }}</p>
                    </van-grid-item>
                  </van-grid>
                </van-cell>
            </van-cell-group>
        </div>
        <br>
        <!-- 个人中心 -->
        <div class="user-order">
            <van-cell-group @click="coding" inset>
                <van-cell title="个人中心" is-link/>
                <van-cell>
                  <van-grid :border="false"  :column-num="3">
                    <van-grid-item icon="award-o" text="积分" />
                    <van-grid-item icon="manager-o" text="文字" />
                    <van-grid-item icon="photo-o" text="文字" />
                  </van-grid>
                </van-cell>
            </van-cell-group>
        </div>
        <br>
        <!-- 我的宠物 -->
        <div class="user-order">
            <van-cell-group @click="coding" inset>
                <van-cell title="我的宠物 My Pet" is-link/>
                <van-cell>
                  <van-grid :border="false"  :column-num="3">
                    <van-grid-item icon="photo-o" text="文字" >
                      <svg class="icon" aria-hidden="true"><use xlink:href="#icon-bianjichongwuziliao"></use></svg>
                      <p>My Pet</p>
                    </van-grid-item>
                    <van-grid-item >
                      <svg class="icon" aria-hidden="true"><use xlink:href="#icon-chongwushibie"></use></svg>
                      <p>健康报告</p>
                    </van-grid-item>
                  </van-grid>
                </van-cell>
            </van-cell-group>
        </div>
        <!-- logout btn -->
        <div class="btn">
            <van-button round size="small" type="primary" @click="logout">退出登录</van-button>
        </div>
      </div>
    </div>
<navBar/>
</template>

<script setup>
import navBar from '@/components/NavBar.vue'
import { getUserInfo } from '@/service/user.js'
import { reactive } from 'vue'
import { showFailToast } from 'vant'
const state = reactive({
  userInfo: {}
})
// user-order 图标
const orderIcon = [
  {
    icon: '#icon-weizhifu',
    title: '未支付'
  }, {
    icon: '#icon-zhifu',
    title: '进行中'
  }, {
    icon: '#icon-dingdan',
    title: '我的订单'
  }
]
const initUserInfo = async () => {
  const id = parseInt(localStorage.getItem('id'))
  const { data: res } = await getUserInfo(id)
  if (res.meta.status === 200) {
    state.userInfo = res.data
  } else {
    showFailToast(res.meta.msg)
  }
}
initUserInfo()

const coding = () => {
  showFailToast('开发中...')
}

const logout = () => {
  localStorage.clear()
  // localStorage.setItem('token', '')
  window.location.href = '/home'
}

</script>
<style scoped lang='less'>
@import '@/common/style/mixin';
.user{
  height: 100vh;
  // background: linear-gradient(90deg, @primary, #3673c2);
  background: linear-gradient(90deg, #3673c2, rgb(255, 239, 245));
  display: flex;
  flex-direction: column;
  // 清除 van-cell左右padding
  --van-cell-group-inset-padding:0;
  --van-grid-item-content-padding:0;
  .van-cell--clickable{
    padding-top: 5px ;
    padding-bottom: 5px ;
  }
  .user-info {
    width: 100%;
    //margin: 10px;
    height: 200px;
    background: rgba(#000, .1);
    .info {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 25px 20px;
      .boxSizing();
      img {
        .wh(60px, 60px);
        border-radius: 50%;
          //   margin-top: 4px;
      }
      .user-desc {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        line-height: 20px;
        font-size: 14px;
        color: #fff;
        span {
          color: #fff;
          font-size: 14px;
          padding: 2px 0;
        }
      }
    }
  }
  //
  .user-contain{
    background-color: rgb(247, 247, 247);
    height: 100%;
    border-radius: 10px;
    transform: translateY(-15px);
    padding: 0 20px;
    .user-order{
      // width: 312px;
      //margin: 70px auto 0;
      background-color: #fff;
      border-radius: 6px;
      margin: 0 auto;
      transform: translateY(-30px);
      p{
        font-size: 12px;
      }
    }
    .btn{
        width: 300px;
        margin: 70px auto 0;
        .van-button{
            width: 100%;
        }

    }
  }
}
// 图标样式修改
p{
  margin-block-start: 0;
  margin-block-end: 0;
  }
.icon{
  font-size: 25px;
}

</style>
