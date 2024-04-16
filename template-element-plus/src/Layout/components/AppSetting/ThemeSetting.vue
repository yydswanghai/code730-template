<template>
  <div class="i-setting">
    <el-divider class="i-divider">系统模式</el-divider>
    <el-tooltip placement="bottom">
      <el-switch
        size="large"
        v-model="settingStore.themeSetting.isDark"
        :active-icon="Sunny"
        :inactive-icon="Moon"
        style="--el-switch-on-color: #ffd93b; --el-switch-off-color: #000e1c"
        inline-prompt
      />
      <template #content>
        <span>{{ !settingStore.themeSetting.isDark ? "深" : "浅" }}色模式</span>
      </template>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { Sunny, Moon } from "@element-plus/icons-vue";
import { useProjectSettingStore } from "@/store/modules/projectSetting";
import { toggleDark } from "@/composables/";

const settingStore = useProjectSettingStore();
watch(
  () => settingStore.themeSetting.isDark,
  (val) => {
    settingStore.setDark(val);
    toggleDark(val); // 切换主题
  }
);
</script>
