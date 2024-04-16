<template>
  <el-menu
    class="aside-menu"
    :unique-opened="false"
    :default-active="selectKey"
    :collapse="collapsed"
    :ellipsis="false"
    :collapse-transition="false"
    @select="handleSelect"
  >
    <MenuItem
      v-for="route in menus"
      :key="route.name"
      :option="route"
      :base-path="route.path"
    />
  </el-menu>
</template>

<script lang="ts" setup>
import MenuItem from "./MenuItem";
import { useProjectSettingStore } from "@/store/modules/projectSetting";
import { useAsyncRouteStore } from "@/store/modules/asyncRoute";
import { isExternal } from "@/utils/";
import { IRouteRecordRaw } from "@/router/types";

defineOptions({
  name: "Menu",
});
const $route = useRoute();
const $router = useRouter();
const settingStore = useProjectSettingStore();
const asyncRouteStore = useAsyncRouteStore();
const menus = ref<IRouteRecordRaw[] | any>([]);
const collapsed = computed(() => settingStore.collapsed);
const selectKey = ref<string>($route.path as string);

/* 菜单切换栏目跳转对应的路由 */
function handleSelect(index: string) {
  if (isExternal(index)) {
    window.open(index);
  } else {
    $router.push(index);
  }
}
/* 渲染菜单 */
function renderMenu() {
  // 过滤掉隐藏的菜单
  const routes = asyncRouteStore.menus.filter(
    (it) => !Boolean(it.meta?.hidden)
  );
  menus.value = routes;
}
/* 路由地址变化时，重新渲染 */
watch(
  () => $route.fullPath,
  () => {
    renderMenu();
    selectKey.value = $route.path as string;
  }
);
onMounted(() => {
  renderMenu();
});
</script>
<style lang="scss" scoped>
@import "@/styles/var.scss";
.aside-menu {
  height: 100%;
  border-right: 0;
  --bg: var(--i-menu-bg-color);
  --text-color: var(--i-menu-primary-color);
  background-color: var(--bg);
  :deep(.el-menu-item) {
    color: var(--text-color);
    &:hover {
      color: var(--el-color-primary);
      background-color: unset;
    }
    &.is-active {
      color: var(--i-white-color) !important;
      background-color: var(--el-color-primary);
    }
  }
  :deep(.el-sub-menu__title) {
    color: var(--text-color);
    &:hover {
      color: var(--el-color-primary);
      background-color: unset;
    }
  }
  :deep(.el-menu-item-group__title) {
    padding: 0;
  }
  .i-menu :deep(.el-menu) {
    background-color: var(--bg);
  }
}
</style>
<style lang="scss">
@import "@/styles/var.scss";
.el-popper.i-popper-menu {
  --bg: var(--i-menu-bg-color);
  --text-color: var(--i-menu-primary-color);
  .el-menu {
    padding-top: 0;
    padding-bottom: 0;
    background-color: var(--bg);
  }
  .el-menu-item-group__title {
    padding: 0;
  }
  .el-menu-item {
    color: var(--text-color);
    background-color: unset;
    &:hover {
      color: var(--el-color-primary);
      background-color: unset;
    }
    &.is-active {
      color: var(--i-white-color);
      background-color: var(--el-color-primary);
    }
  }
  .i-menu {
    .el-sub-menu__title {
      color: var(--text-color);
      background-color: unset;
      &:hover {
        color: var(--el-color-primary);
        background-color: unset;
      }
    }
  }
}
.el-popper.i-popper-head-menu {
  --bg: var(--i-head-bg-color);
  --text-color: var(--i-head-primary-color);
}
</style>
