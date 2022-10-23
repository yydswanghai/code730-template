<template>
    <Swiper
        class="i-swiper"
        :slides-per-view="4"
        :space-between="10"
        :slides-per-group="4"
        >
        <SwiperSlide class="i-slide" v-for="(item, index) in list" :key="index">
            <slot :item="item">
                <div class="i-swiper-item">
                    <div class="image">
                        <img :src="getAssetsFile(item.imgURL)" />
                        <span v-if="item.score">观众评分{{ item.score }}</span>
                    </div>
                    <div class="title">{{ item.title }}</div>
                </div>
            </slot>
        </SwiperSlide>
    </Swiper>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import { Swiper, SwiperSlide } from 'swiper/vue'
import "swiper/css"
import { getAssetsFile } from '@/utils/'

export default defineComponent({
    name: 'ISwiper',
    props: {
        list: {
            type: Array as PropType<any[]>,
            default: () => []
        },
    },
    components: {
        Swiper,
        SwiperSlide
    },
    setup(){
        return {
            getAssetsFile,
        }
    }
})
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
.i-swiper{
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
            span{
                position: absolute;
                bottom: 0;
                left: 0;
                color: #faaf00;
                font-size: 12px;
                width: 100%;
                display: block;
                text-align: center;
            }
        }
        .title{
            font-size: 12px;
            @include ellipsis;
        }
    }
}

</style>