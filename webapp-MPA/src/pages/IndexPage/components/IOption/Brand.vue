<template>
    <SwiperProvider class="brand-tab-content">
        <SwiperSlide v-for="(item, index) in list" :key="index" style="height: 42px">
            <div class="between item">
                <span>{{item.theaterClassificationName}}</span>
                <span>{{item.theaterClassificationNumber}}</span>
            </div>
        </SwiperSlide>
    </SwiperProvider>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { SwiperSlide } from 'swiper/vue'
import { SwiperProvider } from '@/components/SwiperProvider/'
import { getTheater } from '@/api/index'

const list = ref();
async function fetchTheater() {
    const res = await getTheater();
    if(res.code === 200){
        list.value = res.data.theaterClassificationData;
    }
}
fetchTheater();
</script>
<style lang="scss" scoped>
.brand-tab-content{
    width: 100%;
    height: 335px;
    background-color: #fff;
    font-size: 14px;
    .item{
        width: 100%;
        height: 42px;
        border-bottom: 1px solid #e6e6e6;
        padding: 0 24px 0 20px;
        box-sizing: border-box;
    }
}
</style>