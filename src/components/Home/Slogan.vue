<!-- eslint-disable vue/multi-word-component-names -->
<!--  -->
<template>
    <div class="slogan">
        <van-divider :style="{ color: '#053396', borderColor: '#053396', padding: '0 15px' }">
            Slogan
        </van-divider>
        <van-skeleton  avatar title :row="8" />
        <div class="slogan-img">
            <van-image
            width="100%"
            fit="contain"
            position="bottom"
            src='http://43.139.223.94:8889/tmp_uploads/statics/photo1.jpg'
            />
        </div>
        <van-divider :style="{ color: '#053396', borderColor: '#053396', padding: '0 15px' }">
            Community
        </van-divider>
        <van-skeleton  avatar title :row="8" />
    </div>
</template>

<script setup>

</script>
<style scoped lang='less'>
.slogan{
    padding: 10px 20px;
    .slogan-img{
        margin: 25px 0;
    }
}
</style>
