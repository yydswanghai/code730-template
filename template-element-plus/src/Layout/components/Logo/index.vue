<template>
  <div class="logo">
    <el-icon :size="32" class="icon" :class="{ 'margin-right': !collapsed }">
      <Logo2 />
    </el-icon>
    <div class="title" v-show="!collapsed">vueElementPlus</div>
  </div>
</template>

<script lang="ts" setup>
import Logo2 from "@/assets/logo-2.svg?component";
import { useProjectSettingStore } from "@/store/modules/projectSetting";

defineOptions({
  name: "Logo",
});
const settingStore = useProjectSettingStore();
const collapsed = computed(() => settingStore.collapsed);
</script>
<style lang="scss" scoped>
.logo {
  height: 4rem;
  line-height: 1.5;
  white-space: normal;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--i-menu-bg-color);
  .icon {
    width: auto;
    height: 2rem;
    &.margin-right {
      margin-right: 0.5rem;
    }
  }
  .title {
    margin-bottom: 0px;
    font-size: 16px;
    color: var(--i-menu-primary-color);
  }
}
</style>
