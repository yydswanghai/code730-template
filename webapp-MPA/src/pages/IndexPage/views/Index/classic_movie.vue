<template>
    <SwiperProvider>
        <SwiperSlide style="height: 110px"
            v-for="(item, index) in classicMovieData.movieList"
            :key="index">
            <MovieInfo :data="item" :type="('classicMovie' as moiveType)">
                <template #right>
                    <div class="score">
                        <span>{{ item.score }}</span>分
                    </div>
                </template>
            </MovieInfo>
        </SwiperSlide>
        <SwiperSlide style="height: 50px;" />
    </SwiperProvider>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { SwiperSlide } from 'swiper/vue'
import { SwiperProvider } from '@/components/SwiperProvider/'
import { getHotMovie } from '@/api/index'
import { MovieInfo, moiveType } from '../../components/MovieInfo/'

const classicMovieData = reactive({
    movieList: [] as any[],
});

async function fetchHotMovie() {
    const res = await getHotMovie();
    if(res.code === 200){
        classicMovieData.movieList = res.data;
    }
}
fetchHotMovie();

</script>
<style lang="scss" scoped>
.swiper-container {
    .score{
        position: absolute;
        top: 12px;
        right: 18px;
        font-size: 13px;
        span{
            color: #faaf00;
            font-weight: 700;
        }
    }
}
</style>