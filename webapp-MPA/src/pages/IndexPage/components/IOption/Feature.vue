<template>
    <SwiperProvider class="special-tab-content">
        <SwiperSlide style="height: 110px;">
            <van-card title="特色功能">
                <template #desc>
                    <van-button plain
                        v-for="(item, index) in list.specialFunc"
                        :key="index">{{ item.labelName }}</van-button>
                </template>
            </van-card>
        </SwiperSlide>
        <SwiperSlide style="height: 401px;">
            <van-card title="特殊厅">
                <template #desc>
                    <div v-for="(items, index) in list.specialTheater" :key="index" class="buttons-box">
                        <van-button plain
                            v-for="(item, index) in items"
                            :key="index">{{ item.labelName }}</van-button>
                    </div>
                </template>
            </van-card>
        </SwiperSlide>
    </SwiperProvider>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { SwiperSlide } from 'swiper/vue'
import { SwiperProvider } from '@/components/SwiperProvider/'
import { getTheater } from '@/api/index'
import { chunk } from 'lodash'

const list = reactive({
    specialFunc: [] as any[],
    specialTheater: [] as any[]
})
async function fetchTheater() {
    const res = await getTheater();
    if(res.code === 200){
        const { labelData } = res.data;
        list.specialFunc = labelData[0].specialFunc;
        list.specialTheater = chunk(labelData[0].specialTheater, 4);
    }
}
fetchTheater();
console.log(list)
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
.special-tab-content{
    width: 100%;
    height: 306px;
    .van-card{
        :deep(.van-card__title){
            font-size: 16px;
            margin: 12px 0 14px;
        }
    }
    .buttons-box{
        margin-bottom: 5px;
    }
    .van-button{
        margin-right: 5px;
        border-radius: 5px;
        width: 84px;
        box-sizing: border-box;
        :deep(.van-button__content){
            .van-button__text{
                @include ellipsis;
            }
        }
    }
}
</style>