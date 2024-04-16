<template>
  <el-config-provider namespace="el" :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import { toggleDark } from '@/composables/'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const $route = useRoute();
const $router = useRouter();
const settingStore = useProjectSettingStore();
toggleDark(settingStore.themeSetting.isDark);// 初始化亮色主题
/* 全局刷新 */
provide('reload', () => $router.push({ path: '/redirect' + unref($route).fullPath }));
</script>