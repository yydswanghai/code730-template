<template>
    <el-drawer v-model="show" :with-header="false" :size="280">
        <div class="app-setting">
            <!-- 主题 -->
            <ThemeSetting />
            <!-- 系统主题色 -->
            <ThemeListSetting />
            <!-- 导航模式 -->
            <NavModeSetting />
            <!-- 导航风格 -->
            <NavThemeSetting />
            <!-- 其他设置 -->
            <OtherSetting />
            <!-- 动画设置 -->
            <AnimateSetting />
        </div>
    </el-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue"
import ThemeSetting from './ThemeSetting.vue'
import ThemeListSetting from './ThemeListSetting.vue'
import NavModeSetting from './NavModeSetting.vue'
import NavThemeSetting from './NavThemeSetting.vue'
import OtherSetting from './OtherSetting.vue'
import AnimateSetting from './AnimateSetting.vue'

export default defineComponent({
    name: 'AppSetting',
    components: {
        ThemeSetting,
        ThemeListSetting,
        NavModeSetting,
        NavThemeSetting,
        OtherSetting,
        AnimateSetting
    },
    setup(){
        const state = reactive({
            show: false,
            title: '系统设置',
            width: 280,
            markedWords: '所有的设置都是即时的没有保存任何状态'
        });

        function openSetting() {
            state.show = true;
        }

        return {
            ...toRefs(state),
            openSetting,
        }
    }
})
</script>
<style lang="scss">
.app-setting{
    .i-setting{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px 0;
        flex-wrap: wrap;
        :deep(.i-divider){
            margin: 10px 0 20px;
        }
        .i-container{
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            padding: 2px 0;
            .i-container-item{
                margin-right: 16px;
                display: flex;
                flex-direction: column;
                align-items: center;
                img{
                    margin-bottom: .5rem;
                }
            }
        }
        .i-item{
            display: flex;
            align-items: center;
            padding: 12px 0;
            flex-wrap: wrap;
            width: 100%;
            .title{
                flex: 1 1;
                font-size: 14px;
            }
            .switch{
                flex: 0 0 auto;
            }
        }
    }
}
</style>