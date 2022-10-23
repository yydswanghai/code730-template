<template>
    <SwiperProvider>
        <SwiperSlide style="height: 10px;" />
        <SwiperSlide style="height: 182px">
            <van-card title="近期最受期待">
                <template #desc>
                    <ISwiper :list="willComingData.movieList" />
                </template>
            </van-card>
        </SwiperSlide>
        <SwiperSlide style="height: 10px;" />
        <SwiperSlide style="height: 110px"
            v-for="(item, index) in willComingData.movieList"
            :key="index">
            <MovieInfo :data="item" :type="('willComing' as moiveType)">
                <template #right>
                    <van-button color="#3a7afe" size="small" class="btn" style="padding: 0 6px;">待售</van-button>
                </template>
            </MovieInfo>
        </SwiperSlide>
        <SwiperSlide style="height: 10px;" />
        <SwiperSlide style="height: 50px;" />
    </SwiperProvider>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { SwiperSlide } from 'swiper/vue'
import { SwiperProvider } from '@/components/SwiperProvider/'
import { ISwiper } from '../../components/ISwiper/'
import { getHotMovie } from '@/api/index'
import { MovieInfo, moiveType } from '../../components/MovieInfo/'

const willComingData = reactive({
    movieList: [] as any[],
});

async function fetchHotMovie() {
    const res = await getHotMovie();
    if(res.code === 200){
        willComingData.movieList = res.data;
    }
}
fetchHotMovie();

</script>
<style lang="scss" scoped>
.swiper-container {
    --card-title-font-size: 15px;
    .van-card{
        background-color: #FFF;
        :deep(.van-card__title){
            font-size: 16px;
            margin-top: 8px;
            margin-bottom: 14px;
        }
    }
    .btn{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
}
</style>