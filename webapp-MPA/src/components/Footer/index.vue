<template>
    <van-tabbar v-model="active" class="footer" @change="handleChange">
        <van-tabbar-item :name="pageEnum.index">
            电影/影院
            <template #icon><Film width="20" height="20" /></template>
        </van-tabbar-item>
        <van-tabbar-item :name="pageEnum.video">
            视频
            <template #icon><Video width="20" height="20" /></template>
        </van-tabbar-item>
        <van-tabbar-item :name="pageEnum.shortVideo">
            小视频
            <template #icon><shortVideo width="20" height="20" /></template>
        </van-tabbar-item>
        <van-tabbar-item :name="pageEnum.performance">
            演出
            <template #icon><Show width="20" height="20" /></template>
        </van-tabbar-item>
        <van-tabbar-item :name="pageEnum.mine">
            我的
            <template #icon><User width="20" height="20" /></template>
        </van-tabbar-item>
    </van-tabbar>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue"
import { Film, Video, shortVideo, Show, User } from '@/icons/'
import { pageEnum } from '@/enums/pageEnum'

export default defineComponent({
    name: 'Footer',
    components: {
        Film,
        Video,
        shortVideo,
        Show,
        User
    },
    props: {
        category: {
            type: String as PropType<pageEnum>,
            default: pageEnum.index
        }
    },
    setup(props){
        const active = ref<string>(props.category);

        const handleChange = (act: string|number) => {
            window.location.href = act as string;
        }

        return {
            pageEnum,
            active,
            handleChange
        }
    }
})
</script>
<style lang="scss" scoped>
.van-tabbar{
    --van-tabbar-height: var(--footer-height);
    :deep(.van-tabbar-item){
        padding: 6px 12px 8px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .van-tabbar-item__icon{
            width: 32px;
            height: 22px;
            text-align: center;
            font-size: 16px;
        }
    }
}
</style>