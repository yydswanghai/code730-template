<template>
    <div class="header">
        <van-nav-bar title="标题" @click-right="onClickRight">
            <template #right>
                <van-icon name="wap-nav" size="24" color="#fff" />
            </template>
        </van-nav-bar>
        <Logo />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { Logo } from '@/components/Logo'
import { Toast } from 'vant'
export default defineComponent({
    name: 'Header',
    props: {
        title: {
            type: String,
            default: '标题'
        },
        backBtn: {
            type: Boolean,
            default: false
        },
        burgerBtn: {
            type: Boolean,
            default: true
        }
    },
    components: {
        Logo
    },
    setup(){
        function onClickRight() {
            Toast('菜单')
        }
        return {
            onClickRight,
        }
    }
})
</script>
<style lang="scss" scoped>
.header{
    width: 100%;
    position: sticky;
    z-index: 10;
}
</style>