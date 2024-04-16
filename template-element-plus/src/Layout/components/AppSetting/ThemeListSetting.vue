<template>
  <div class="i-setting">
    <el-divider class="i-divider">修改主题色</el-divider>
    <el-color-picker
      v-model="settingStore.themeSetting.primary"
      :predefine="settingStore.themeSetting.colorList"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { useProjectSettingStore } from "@/store/modules/projectSetting";
import { useChangeTheme } from "@/hooks/useChangeTheme";

const settingStore = useProjectSettingStore();
function handleChange(_color: string | null) {
  if (_color) {
    settingStore.setAppTheme(_color);
    useChangeTheme(_color);
  }
}
</script>
