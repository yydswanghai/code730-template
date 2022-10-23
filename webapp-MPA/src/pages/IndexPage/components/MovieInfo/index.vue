<template>
    <div class="movie-info">
        <div class="movie-poster center">
            <img :src="getAssetsFile(data.imgURL)" />
        </div>
        <div class="movie-details">
            <h3>
                <slot name="title">{{ data.title }}</slot>
            </h3>
            <p>观众评分：<span>{{ data.score }}</span></p>
            <p>主演：{{ data.mainActor }}</p>
            <!-- 其他说明 -->
            <p v-if="type === 'movie'">今天{{ data.theaterCount }}家影院放映<span>{{ data.playCount }}</span>场</p>
            <p v-if="type === 'willComing'">{{ data.releaseDate }}上映</p>
            <p v-if="type === 'classicMovie'">{{ data.releaseDate }}{{ data.releaseLocation }}上映</p>
            <!-- 右侧按钮/评分 -->
        </div>
        <div class="movie-right">
            <slot name="right">
                <van-button type="primary" size="small" class="btn">购票</van-button>
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import { moiveType } from './index'
import { getAssetsFile } from '@/utils/'

export default defineComponent({
    name: 'MovieInfo',
    props: {
        data: {
            type: Object,
            default: () => ({})
        },
        type: {
            type: String as PropType<moiveType>,
            default: 'movie'
        }
    },
    setup(){
        return {
            getAssetsFile
        }
    }
})
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
.movie-info{
    width: 100%;
    display: flex;
    height: 110px;
    box-sizing: border-box;
    background-color: #FFF;
    --left-width: 86px;
    --right-width: 80px;
    .movie-poster{
        flex: 0 0 var(--left-width);
        height: 100%;
        padding: 0 12px;
        box-sizing: border-box;
        img{
            width: 100%;
        }
    }
    .movie-details{
        flex: 1 1 auto;
        height: 100%;
        width: calc(100% - var(--left-width) - var(--right-width));
        padding: 9px 0;
        box-sizing: border-box;
        h3{
            font-size: 17px;
            font-weight: 400;
            margin-bottom: 6px;
            @include ellipsis;
        }
        p{
            @include ellipsis;
            color: #777;
            font-size: 12px;
            margin-bottom: 6px;
            span{
                font-weight: 700;
                color: #faaf00;
            }
        }
    }
    .movie-right{
        flex: 0 0 var(--right-width);
        position: relative;
        .btn{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            padding: 0 6px;
        }
    }
}
</style>