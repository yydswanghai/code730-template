<template>
    <van-config-provider :theme-vars="themeVars" class="page-container">
        <slot />
    </van-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import type { ConfigProviderProps } from 'vant'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
export default defineComponent({
    name: 'AppProvider',
    setup(){
        const settingStore = useProjectSettingStore();
        const themeVars: ConfigProviderProps['themeVars'] = {
            primaryColor: settingStore.theme.primary,
            tabbarHeight: settingStore.footerHeight,
            navBarHeight: '54px',
            navBarBackgroundColor: settingStore.theme.primary,
            navBarTitleTextColor: '#fff',
            tabbarItemActiveColor: settingStore.theme.primary,
            buttonPrimaryBackgroundColor: settingStore.theme.primary,
            buttonPrimaryBorderColor: settingStore.theme.primary,
        }
        return {
            themeVars,
        }
    }
})
</script>
<style lang="scss" scoped>
.page-container{
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>