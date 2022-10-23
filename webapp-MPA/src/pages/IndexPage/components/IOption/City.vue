<template>
    <div class="city-tab-content">
        <div class="city-tab-content-top">
            <div>商区</div>
            <div>地铁站</div>
        </div>
        <div class="city-tab-content-bottom">
            <SwiperProvider class="city_left">
                <SwiperSlide v-for="(item, index) in areaList" :key="index" style="height: 42px">
                    <div class="between item" :class="{ 'active': index === active }" @click="active = index">
                        {{item.areaName}}{{item.areaNumber}}
                    </div>
                </SwiperSlide>
            </SwiperProvider>
            <SwiperProvider class="city_right">
                <SwiperSlide v-for="(item, index) in streetList" :key="index" style="height: 42px">
                    <div class="between item">
                        <span>{{item.streetName}}</span>
                        <span>{{item.streetNumber}}</span>
                    </div>
                </SwiperSlide>
            </SwiperProvider>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { SwiperSlide } from 'swiper/vue'
import { SwiperProvider } from '@/components/SwiperProvider/'
import { getTheater } from '@/api/index'

const active = ref(2);
const areaList = ref();
const streetList = ref();
async function fetchTheater() {
    const res = await getTheater();
    if(res.code === 200){
        areaList.value = res.data.areaData;
        streetList.value = res.data.streetData;
    }
}
fetchTheater();

</script>
<style lang="scss" scoped>
.city-tab-content{
    width: 100%;
    height: 406px;
    background-color: #fff;
    font-size: 14px;
    .city-tab-content-top{
        width: 100%;
        height: 42px;
        display: flex;
        div{
            width: 50%;
            height: 100%;
            text-align: center;
            line-height: 42px;
            box-sizing: border-box;
            &:nth-child(1){
                color: #f43b32;
                border-bottom: 1px solid #f43b32;
            }
        }
    }
    .city-tab-content-bottom{
        height: 364px;
        width: 100%;
        display: flex;
        .item{
            line-height: 42px;
        }
        .city_left{
            width: 35%;
            height: 100%;
            .item{
                background-color: #fff;
                text-indent: 2em;
                &.active{
                    background-color: #f6f6f6;
                }
            }
        }
        .city_right{
            width: 65%;
            height: 100%;
            .item{
                width: 100%;
                background-color: #f6f6f6;
                box-sizing: border-box;
                padding: 0 22px 0 10px;
            }
        }
    }
}
</style>