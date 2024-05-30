<template>
  <el-container class="layout">
    <!-- 侧边栏 -->
    <el-aside class="layout-aside" :style="{ width: menuWidth }">
      <el-scrollbar>
        <Logo />
        <AsideMenu />
      </el-scrollbar>
    </el-aside>
    <el-container class="layout-right">
      <!-- 头部 -->
      <el-header class="layout-header" :class="{ 'i-fixed-header': fixedHeader }">
        <Header />
      </el-header>
      <!-- 菜单标签 -->
      <TagsView v-if="showTagsView"
        :class="{
          'i-fixed-tags-view': fixedTagsView,
          'i-tags-view-dark-bg': isDark,
          'i-tags-view-bg': !isDark,
        }"
      />
      <el-scrollbar class="i-scroll">
        <!-- 内容区 -->
        <main class="i-main">
          <Main class="layout-main" :class="{ 'no-tags-view': !fixedTagsView }" />
        </main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { useProjectSettingStore } from "@/store/modules/projectSetting";
import { Logo } from "./components/Logo/";
import { Menu as AsideMenu } from "./components/Menu/";
import { Header } from "./components/Header/";
import { Main } from "./components/Main/";
import { TagsView } from "./components/TagsView/";

defineOptions({
  name: "Layout",
});

const settingStore = useProjectSettingStore();
/* 侧边栏宽度 */
const menuWidth = computed(() =>
  settingStore.collapsed
    ? settingStore.menuSetting.minMenuWidth + "px"
    : settingStore.menuSetting.menuWidth + "px"
);
/* 监听屏幕宽度改变 */
function watchScreenWidth() {
  const { mobileWidth } = settingStore.menuSetting;
  if (document.body.clientWidth <= mobileWidth) {
    settingStore.setCollapse(true);
  } else {
    settingStore.setCollapse(false);
  }
}
onMounted(() => {
  window.addEventListener("resize", watchScreenWidth);
});

const fixedHeader = computed(() => settingStore.headerSetting.fixed);
const fixedTagsView = computed(() => settingStore.tagsViewSetting.fixed);
const showTagsView = computed(() => settingStore.tagsViewSetting.show);
const isDark = computed(() => settingStore.themeSetting.isDark);
const menuSetting = computed(() => settingStore.menuSetting);
const headerSetting = computed(() => settingStore.headerSetting);
</script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  position: relative;
  --gap: 20px;
  --menu-width: v-bind(menuWidth);
  --i-menu-bg-color: v-bind(menuSetting.bg);
  --i-menu-primary-color: v-bind(menuSetting.color);
  --i-head-bg-color: v-bind(headerSetting.bg);
  --i-head-primary-color: v-bind(headerSetting.color);
  .layout-aside {
    transition: all 0.3s;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    z-index: 10;
    background-color: var(--i-menu-bg-color);
  }
  .layout-right {
    padding-left: var(--gap);
  }
  /***** h *****/
  .layout-header {
    padding-right: 0;
    padding-left: 0;
    height: $header-height;
  }
  .i-main {
    padding-right: 0;
    padding-top: 0;
    box-sizing: border-box;
  }
  .layout-main {
    padding-top: 44px;
    width: 100%;
    &.no-tags-view {
      padding-top: 0;
    }
  }
  .i-scroll {
    width: 100%;
    height: 100%;
  }
  .i-tags-view-bg {
    background: #f5f7f9;
  }
  .i-tags-view-dark-bg {
    background: #101014;
  }
  /* 固定顶栏 */
  .i-fixed-header {
    position: sticky;
    position: -webkit-sticky;
    left: var(--menu-width);
    right: 0;
    top: 0;
    z-index: 100;
  }
  .i-fixed-tags-view {
    position: fixed;
    left: calc(var(--menu-width) + var(--gap));
    right: 0;
    top: $header-height;
    z-index: 1;
  }
}
</style>
