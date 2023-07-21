<!-- eslint-disable vue/multi-word-component-names -->
<!--  -->
<template>
    <div class="slogan">
        <div class="slogan-img">
            <van-image
            width="100%"
            fit="contain"
            position="bottom"
            src='http://43.139.223.94:8889/tmp_uploads/statics/photo1.jpg'
            />
        </div>
        <van-divider :style="{ color: '#053396', borderColor: '#053396', padding: '0 15px' }">
            基因检测
        </van-divider>
        <section v-for="item in testList">
            <div class="test-item">
                <div class="item-img">
                    <van-image
                    width="100%"
                    fit="contain"
                    position="bottom"
                    :src=item.url
                    />
                </div>
                <div class="item-desc">
                    <div class="item-title">
                        {{ item.title }}
                    </div>
                    {{ item.desc }}
                </div>
            </div>
            <van-divider v-if="item.id!==5" :style="{ color: '#053396', borderColor: '#fff', padding: '0 15px' }">
                <van-icon name="arrow-down" />
            </van-divider>
        </section>

        <!-- <van-skeleton  avatar title :row="2" />
        <van-divider :style="{ color: '#053396', borderColor: '#053396', padding: '0 15px' }">
            Community
        </van-divider>
        <van-skeleton  avatar title :row="8" /> -->
    </div>
</template>

<script setup>
import { reactive } from 'vue'
const testList = reactive([
  { id:1,title:'提取DNA',desc:'細胞樣本經過裂解與純化，得到了DNA樣本',url: 'http://43.139.223.94:8889/tmp_uploads/statics/icon_01.png' },
  { id:2,title:'文庫構建',desc:'整理DNA樣本，使其符合測序的要求',url: 'http://43.139.223.94:8889/tmp_uploads/statics/icon_02.png' },
  { id:3,title:'基因測序',desc:'在測序儀上分析特定DNA 片段的鹼基序列',url: 'http://43.139.223.94:8889/tmp_uploads/statics/icon_03.png' },
  { id:4,title:'數據分析',desc:'分析解讀DNA測序信息',url: 'http://43.139.223.94:8889/tmp_uploads/statics/icon_04.png' },
  { id:5,title:'解讀報告',desc:'將生物信息轉化為圖形或文字',url: 'http://43.139.223.94:8889/tmp_uploads/statics/icon_05.png' },
])
</script>
<style scoped lang='less'>
@import '@/common/style/mixin';
.slogan{
    padding: 10px 20px;
    .slogan-img{
        margin: 15px 0;
    }
    .test-item{
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        .item-img{
            box-sizing: border-box;
            width: 35%;
            padding: 20px;
        }
        .item-desc{
            
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .item-title{
                font-size: large;
                color: @primary;
            }
        }

    }
    // .test-list{
    //     .test-item{

    //     }

    // }
}
</style>
