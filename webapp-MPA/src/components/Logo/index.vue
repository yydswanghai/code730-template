<template>
    <div class="logo between">
        <div class="logo_left">
            <img src="~@/assets/logo.svg?url" />
            <span>logo</span>
        </div>
        <div class="logo_right between">
            <a href="#">发现最新最热电影</a>
            <span class="split"></span>
            <a href="#">
                <span>打开App</span>
                <van-icon name="arrow" />
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: 'Logo',

})
</script>
<style lang="scss" scoped>
.logo{
    border-bottom: 1px solid #e5e5e5;
    padding: 10px;
    background-color: #FFF;
    .logo_left {
        height: 40px;
        display: flex;
        align-items: center;
        img{
            width: 40px;
            height: 100%;
        }
        span{
            margin-left: 5px;
        }
    }
    .logo_right {
        a:nth-child(1) {
            font-size: 12px;
            font-weight: bold;
            color: #666;
            font-family: PingFangSC-Regular, Arial, Helvetica, sans-seri;
        }
        a:nth-child(3) {
            display: flex;
            align-items: center;
            height: 100%;
            position: relative;
            text-align: left;
            font-size: 12px;
            color: #b37e7e;
            font-weight: 700;
        }
        .split {
            width: 1px;
            height: 30px;
            margin: 0 6px;
            background-color: #e6e6e6;
            transform: scale(1.2);
        }
    }
}
</style>