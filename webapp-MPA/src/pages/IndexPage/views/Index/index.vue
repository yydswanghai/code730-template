<template>
    <SwiperProvider>
        <SwiperSlide style="height: 10px;" />
        <SwiperSlide style="height: 182px">
            <van-card title="热门电影">
                <template #desc>
                    <ISwiper :list="hotMoviesData.movieList" />
                </template>
            </van-card>
        </SwiperSlide>
        <SwiperSlide style="height: 10px;" />
        <SwiperSlide style="height: 110px"
            v-for="(item, index) in hotMoviesData.movieList"
            :key="index">
            <MovieInfo :data="item" :type="('movie' as moiveType)">
                <template #title>
                    <div class="imax-title">
                        <span>{{ item.title }}</span>
                        <img src="~@/assets/mockdata/v2dimax.png" />
                    </div>
                </template>
            </MovieInfo>
        </SwiperSlide>
        <SwiperSlide style="height: 10px;" />
        <SwiperSlide style="height: 182px">
            <van-card title="热门影人">
                <template #desc>
                    <ISwiper :list="hotMoviesData.actorList" v-slot="{ item }">
                        <div class="i-swiper-item">
                            <div class="image"><img :src="getAssetsFile(item.imgURL)" /></div>
                            <div class="title">{{ item.title }}</div>
                        </div>
                    </ISwiper>
                </template>
            </van-card>
        </SwiperSlide>
        <SwiperSlide style="height: 10px;" />
        <SwiperSlide style="height: 340px;">
            <div class="moive-news">
                <h2>娱乐热点</h2>
                <ul>
                    <li v-for="(item, index) in hotMoviesData.newsList" :key="index">
                        <a href="#">{{ item.newsName }}</a>
                    </li>
                </ul>
            </div>
        </SwiperSlide>
        <SwiperSlide style="height: 50px;" />
    </SwiperProvider>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { SwiperSlide } from 'swiper/vue'
import { SwiperProvider } from '@/components/SwiperProvider/'
import { MovieInfo, moiveType } from '../../components/MovieInfo/'
import { ISwiper } from '../../components/ISwiper/'
import { getHotActor, getHotMovie, getHotNews } from '@/api/index'
import { getAssetsFile } from '@/utils/'

const hotMoviesData = reactive({
    actorList: [] as any[],
    movieList: [] as any[],
    newsList: [] as any[]
});

async function fetchHotActor() {
    const res = await getHotActor();
    if(res.code === 200){
        hotMoviesData.actorList = res.data;
    }
}
fetchHotActor();
async function fetchHotMovie() {
    const res = await getHotMovie();
    if(res.code === 200){
        hotMoviesData.movieList = res.data;
    }
}
fetchHotMovie();
async function fetchHotNews() {
    const res = await getHotNews();
    if(res.code === 200){
        hotMoviesData.newsList = res.data;
    }
}
fetchHotNews();

</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
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
    .movie-info {
        .imax-title{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span{
                width: calc(100% - 61px);
                display: block;
            }
            img{
                width: 42px;
                height: 14px;
                margin-left: 10px;
            }
        }
    }
    .moive-news{
        height: auto;
        background-color: #fff;
        padding: 16px 12px;
        & > h2 {
            font-size: 15px;
            color: #000;
            font-weight: 400;
            margin-bottom: 16px;
        }

        & li > a {
            font-size: 13px;
            color: #000;
            font-weight: 300;
            margin-bottom: 8px;
        }
    }
    .i-swiper-item{
        .image{
            width: 100%;
            position: relative;
            padding-top: calc(100% * 1.35);
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
        }
        .title{
            font-size: 12px;
            @include ellipsis;
        }
    }
}
</style>