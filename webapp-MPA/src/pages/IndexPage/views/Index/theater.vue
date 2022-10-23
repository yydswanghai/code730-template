<template>
    <IOption />
    <SwiperProvider>
        <SwiperSlide style="height: 38px;" />
        <SwiperSlide style="height: 134px;" v-for="(item, index) in theaterData.list" :key="index">
            <div class="theater-container">
                <h3>
                    {{ item.theaterName }}
                    <span>{{ item.startPrice }}</span>
                    <span>元起</span>
                </h3>
                <p>{{ item.theaterAddr }}</p>
                <div class="label-block">
                    <van-tag color="#589daf" :round="false" plain>退</van-tag>
                    <van-tag color="#009688" :round="false" plain>改签</van-tag>
                    <van-tag color="#f90" :round="false" plain>小吃</van-tag>
                    <van-tag color="#f40" :round="false" plain>折扣卡</van-tag>
                </div>
                <p class="discount">
                    <van-tag color="#1989fa" :round="false">卡</van-tag>
                    开卡特惠，17.9元起开卡
                </p>
            </div>
        </SwiperSlide>
        <SwiperSlide style="height: 50px;" />
    </SwiperProvider>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { SwiperSlide } from 'swiper/vue'
import { SwiperProvider } from '@/components/SwiperProvider/'
import { getTheater } from '@/api/index'
import { IOption } from '../../components/IOption/'

const theaterData = reactive({
    list: [] as any[]
});

async function fetchTheater() {
    const res = await getTheater();
    if(res.code === 200){
        theaterData.list = res.data.theaterData;
    }
}
fetchTheater();
</script>
<style lang="scss" scoped>
.swiper-container {
    background: #fff;
    .theater-container{
        width: 100%;
        margin: 0 auto;
        border-bottom: 1px solid #eaeaea;
        padding: 18px;
        box-sizing: border-box;
        h3 {
            font-size: 16px;
            color: #000;
            font-weight: 400;
            span {
                color: #f23e3c;
                &:nth-child(2) {
                    font-size: 15px;
                }
            }
        }
        p{
            font-size: 13px;
            margin-top: 10px;
            color: #777;
            &.discount {
                display: flex;
                align-items: center;
                .van-tag{
                    font-size: 12px;
                    width: 14px;
                    height: 20px;
                    margin-right: 6px;
                }
            }
        }
        .label-block {
            display: flex;
            font-size: 13px;
            margin-top: 10px;
            .van-tag {
                font-size: 12px;
                width: auto;
                height: auto;
                padding: 2px;
                margin-right: 4px;
            }
        }
    }
}
</style>