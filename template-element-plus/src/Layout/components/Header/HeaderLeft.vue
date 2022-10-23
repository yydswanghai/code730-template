<template>
    <div class="header-left">
        <!-- 菜单收起 -->
        <div class="left-gap trigger" @click="toggleCollapse">
            <el-icon :size="18" v-if="collapsed" class="i-icon"><Fold /></el-icon>
            <el-icon :size="18" v-else class="i-icon"><Expand /></el-icon>
        </div>
        <!-- 刷新 -->
        <div class="left-gap trigger" v-if="isReload" @click="reload">
            <el-icon :size="18" class="i-icon"><RefreshRight /></el-icon>
        </div>
        <!-- 面包屑 -->
        <Breadcrumb />
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from 'vue'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { Fold, Expand, RefreshRight } from '@element-plus/icons-vue'
import { Breadcrumb } from '../Breadcrumb/'

export default defineComponent({
    name: 'HeaderLeft',
    components: {
        Fold,
        Expand,
        RefreshRight,
        Breadcrumb,
    },
    setup(){
        const settingStore = useProjectSettingStore();
        /* 刷新 */
        return {
            reload: inject<() => void>('reload'),
            toggleCollapse: computed(() => settingStore.toggleCollapse),
            isReload: computed(() => settingStore.headerSetting.isReload),
            collapsed: computed(() => settingStore.collapsed)
        }
    }
})
</script>
<style lang="scss" scoped>
.header-left{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
</style>