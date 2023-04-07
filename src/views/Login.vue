<!-- eslint-disable vue/multi-word-component-names -->
<!--  -->
<template>
  <div class="login">
    <van-nav-bar
      title="Login to PPLove"
      left-text="Home"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="login-form">
      <div><h3>体验账号</h3></div>
      <van-form @submit="tryLogin">
        <van-cell-group inset>
          <van-field v-model="state.username"   label="username" placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"  />
          <van-field v-model="state.password"  label="password" type="password" placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
        </van-cell-group>
        <div class="btn">
          <van-button native-type="submit" type="primary" round size="normal">login</van-button>
        </div>
      </van-form>
    </div>

  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { login } from '@/service/user.js'
import { showFailToast, showSuccessToast } from 'vant'
import { useRouter } from 'vue-router'
const router = useRouter()

const state = reactive({
  username: '57497740',
  password: '57497740'
})
const tryLogin = async () => {
  const { data: res } = await login(state)
  if (res.meta.status === 200) {
    showSuccessToast('Login in!')
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('id', res.data.id)
    router.push({ path: '/home' })
  } else {
    showFailToast(res.meta.msg)
  }
}
const onClickLeft = () => {
  router.push({ path: '/home' })
}

</script>
<style scoped lang='less'>
@import '@/common/style/mixin';

.login{
  height: 100vh;
  background-color: rgb(250, 250, 250);
  .login-form{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center
  }
  .btn{
    .boxSizing();
    padding: 30px 20px;
    .van-button{
      width: 100%;
    }
  }
}
</style>
