<template>
  <el-drawer v-model="show" :with-header="false" :size="280">
    <div class="app-setting">
      <!-- 主题 -->
      <ThemeSetting />
      <!-- 系统主题色 -->
      <ThemeListSetting />
      <!-- 其他设置 -->
      <OtherSetting />
      <!-- 动画设置 -->
      <AnimateSetting />
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import ThemeSetting from "./ThemeSetting.vue";
import ThemeListSetting from "./ThemeListSetting.vue";
import OtherSetting from "./OtherSetting.vue";
import AnimateSetting from "./AnimateSetting.vue";

defineOptions({
  name: "AppSetting",
});

const show = ref(false)
const openSetting = () => show.value = true
defineExpose({
  openSetting
});
</script>
<style lang="scss">
.app-setting {
  .i-setting {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 0;
    flex-wrap: wrap;
    :deep(.i-divider) {
      margin: 10px 0 20px;
    }
    .i-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      padding: 2px 0;
      .i-container-item {
        margin-right: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          margin-bottom: 0.5rem;
        }
      }
    }
    .i-item {
      display: flex;
      align-items: center;
      padding: 12px 0;
      flex-wrap: wrap;
      width: 100%;
      .title {
        flex: 1 1;
        font-size: 14px;
      }
      .switch {
        flex: 0 0 auto;
      }
    }
  }
}
</style>
