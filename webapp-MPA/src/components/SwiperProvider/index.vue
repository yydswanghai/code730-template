<template>
    <Swiper
        :slides-per-view="slidesPerView"
        :direction="direction"
        :free-mode="freeMode"
        :modules="modules"
        class="swiper-container"
        >
        <slot />
    </Swiper>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue"
import { SwiperOptions, FreeModeOptions } from 'swiper/types'
import { Swiper } from 'swiper/vue'
import { FreeMode } from "swiper"
import "swiper/css"

export default defineComponent({
    name: 'SwiperProvider',
    components: {
        Swiper
    },
    setup(){
        type swiperOptionType = {
            slidesPerView: SwiperOptions['slidesPerView']
            direction: SwiperOptions['direction']
            freeMode: FreeModeOptions | boolean
            modules: any[]
        }
        /* 滑屏对应的配置 */
        const swiperOption: swiperOptionType = reactive({
            slidesPerView: 'auto',// 每个视图的幻灯片数
            direction: "vertical",// 方向
            freeMode: {// 启用自由模式功能
                enabled: true,// 是否开启自由模式
                momentumRatio: 2,// 释放滑块后，较高的值会产生较大的动量距离
                momentumVelocityRatio: 3,// 释放滑块后，较高的值会产生较大的动量速度
            },
            modules: [FreeMode],
        });
        return {
            ...toRefs(swiperOption),
        }
    }
})
</script>
<style lang="scss" scoped>
.swiper-container {
    width: 100%;
    flex: 1 1 auto;
}
</style>