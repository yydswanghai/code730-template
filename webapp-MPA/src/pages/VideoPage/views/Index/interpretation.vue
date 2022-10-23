<template>
    <Swiper
        :slides-per-view="1"
        :direction="direction"
        :free-mode="freeMode"
        :scrollbar="scrollbar"
        :mousewheel="mousewheel"
        :modules="modules"
        class="swiper-container"
        >
        <SwiperSlide style="height: auto;">
            <div class="item">first列表</div>
            <div class="item">列表</div>
            <div class="item">列表</div>
            <div class="item">列表</div>
            <div class="item">列表</div>
            <div class="item">列表</div>
            <div class="item">列表</div>
            <div class="item">列表</div>
            <div class="item">列表</div>
            <div class="item">列表</div>
            <div class="item">列表</div>
            <div class="item">列表</div>
            <div class="item">列表</div>
            <div class="item">列表</div>
            <div class="item">列表</div>
            <div class="item">列表</div>
            <div class="item">列表</div>
            <div class="item">列表</div>
            <div class="item">列表</div>
            <div class="item">last列表</div>
        </SwiperSlide>
        <SwiperSlide style="height: 0px;"></SwiperSlide>
    </Swiper>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue"
import { Swiper, SwiperSlide } from 'swiper/vue'
import { FreeMode, Scrollbar, Mousewheel } from "swiper"
import { SwiperOptions, FreeModeOptions } from 'swiper/types'
import "swiper/css"
import "swiper/css/scrollbar";

export default defineComponent({
    components: {
        Swiper,
        SwiperSlide,
    },
    setup(){
        const loading = ref(false);
        type swiperOptionType = {
            slidesPerView: SwiperOptions['slidesPerView']
            direction: SwiperOptions['direction']
            modules: any[]
            freeMode?: FreeModeOptions | boolean
            scrollbar?: SwiperOptions['scrollbar']
            mousewheel?:  SwiperOptions['mousewheel']
        }
        /* 滑屏对应的配置 */
        const swiperOption: swiperOptionType = reactive({
            slidesPerView: 'auto',// 每个视图的幻灯片数
            direction: "vertical",// 方向
            freeMode: {// 启用自由模式功能
                enabled: true,// 是否开启自由模式
                // momentumRatio: 2,// 释放滑块后，较高的值会产生较大的动量距离
                // momentumVelocityRatio: 3,// 释放滑块后，较高的值会产生较大的动量速度
            },
            scrollbar: {
                hide: true
            },
            mousewheel: true,
            modules: [FreeMode, Scrollbar, Mousewheel],
        });
        return {
            loading,
            ...toRefs(swiperOption),
        }
    }
})
</script>
<style lang="scss" scoped>
.swiper-container {
    width: 100%;
    flex: 1 1 auto;
    .swiper {
        width: 100%;
        height: 100%;
    }
    .swiper-container{
        overflow: visible;
    }
    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: skyblue;
        height: auto;
    }
    .item{
        position: relative;
        display: block;
        padding: 10px 15px;
        margin-bottom: -1px;
        background-color: #fff;
        border: 1px solid #ddd;
    }
    .item:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }
}
</style>