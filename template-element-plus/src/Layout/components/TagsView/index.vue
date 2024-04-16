<template>
  <div class="tags-view" :style="styleObj">
    <div class="inner">
      <TagContainer :active="activeKey" ref="ContainerRef">
        <Draggable :list="tagsList" animation="300" item-key="fullPath" class="tags-draggable">
          <template #item="{ element }">
            <el-button 
              text 
              class="tags-scroll-item" 
              :class="{ 'active-item': activeKey === element.fullPath }"
              :id="`tag${element.fullPath.split('/').join('\/')}`"
              @click.stop="handleToPage(element)"
              @contextmenu="handleContextMenu($event, element)"
            >
              <span>{{ element.meta.title }}</span>
              <el-icon
                v-if="element.path !== PageEnum.HOME"
                :size="15"
                class="item-icon"
                @click.stop="handleCloseTagItem(element)">
                <CloseRound/>
              </el-icon>
            </el-button>
          </template>
        </Draggable>
      </TagContainer>
      <!-- 下拉菜单 -->
      <ContextMenu
        ref="contextMenuRef"
        v-model:showDropdown="showDropdown"
        v-model:activeKey="activeKey"
        :top="contextMenuY"
        :left="contextMenuX"
        :isCurrent="isCurrent"
        :tagsList="tagsList"
        @update-nav="updateNavScroll()"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Draggable from "vuedraggable";
import TagContainer from './Container.vue';
import ContextMenu from "./ContextMenu.vue";
import { useProjectSettingStore } from "@/store/modules/projectSetting";
import { useTagsViewStore, initTagsViewStore, IRouteItem } from "@/store/modules/tagsView";
import { CloseRound } from "@/icons/";
import { PageEnum } from "@/enums/pageEnum";
import { isExternal } from "@/utils/";

defineOptions({
  name: "TagsView",
});

const $route = useRoute();
const $router = useRouter();
const settingStore = useProjectSettingStore();
const tagsViewStore = useTagsViewStore();
const contextMenuRef = ref<InstanceType<typeof ContextMenu> | undefined>();
const state = reactive({
  activeKey: $route.fullPath, // 当前页面key
  contextMenuX: 0, // contextMenu的X坐标
  contextMenuY: 0, // contextMenu的Y坐标
  showDropdown: false, // 下拉菜单
  isCurrent: false
});
const {
  activeKey,
  contextMenuX,
  contextMenuY,
  showDropdown,
  isCurrent
} = toRefs(state);
const styleObj = computed(() => {
  return { width: settingStore.tagsViewSetting.fixed ? 
    `calc(100% - var(--menu-width) - var(--gap))` : `100%` }
});
// 获取简易路由对象，添加addTags的时候容易出现重复标签被添加的bug
function getSimpleRoute(route: IRouteItem) {
  const { fullPath, hash, meta, name, params, path, query } = route;
  return { fullPath, hash, meta, name, params, path, query };
}
// 初始化标签页
initTagsViewStore(getSimpleRoute($route as IRouteItem));

const tagsList = computed(() => tagsViewStore.tagsList);

const ContainerRef = ref<InstanceType<typeof TagContainer> | undefined>();
function updateNavScroll(bool = false) {
  ContainerRef.value && ContainerRef.value?.updateNavScroll(bool);
}
// 路由改变时候添加新的tag
watch(
  () => $route.fullPath,
  (to) => {
    if (!isExternal(to)) {
      // 跳过外部链接、刷新不添加
      state.activeKey = to;
      tagsViewStore.addTags(getSimpleRoute($route as IRouteItem));
      updateNavScroll(true);
    }
  },
  { immediate: true }
);
/* 切换到对应的页面 */
function handleToPage(element: IRouteItem) {
  const { fullPath } = element;
  if (fullPath === $route.fullPath) return;
  state.activeKey = fullPath;
  $router.push({ path: fullPath });
}
/* 右键菜单 */
function handleContextMenu(event: MouseEvent, element: IRouteItem) {
  event.preventDefault();
  state.isCurrent = PageEnum.HOME === element.path;
  state.showDropdown = false;
  nextTick().then(() => {
    state.showDropdown = true;
    state.contextMenuX = event.clientX;
    state.contextMenuY = event.clientY;
  });
}
/* 关闭当前标签 */
function handleCloseTagItem(element: IRouteItem) {
  const route = tagsList.value.find((it) => it.fullPath === element.fullPath);
  route && contextMenuRef.value?.removeTab(route);
  updateNavScroll(false);
}
</script>
<style lang="scss" scoped>
@import "@/styles/var.scss";
.tags-view {
  width: 100%;
  padding: 6px 0;
  display: flex;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  transition: all 0.3s;
  height: 44px;
  box-sizing: border-box;
  .inner {
    display: flex;
    max-width: 100%;
    min-width: 100%;
  }
  .tags-draggable {
    display: flex;
  }
  .tags-scroll-item {
    background: var(--el-button-bg-color);
    color: var(--el-button-text-color);
    height: 32px;
    padding: 6px 12px 6px;
    margin-right: 6px;
    margin-left: 0;
    cursor: pointer;
    display: inline-block;
    position: relative;
    flex: 0 0 auto;
    box-sizing: border-box;
    span {
      float: left;
      vertical-align: middle;
    }
    .item-icon {
      height: 18px;
      width: 18px;
      margin-right: -6px;
      position: relative;
      top: -2px;
      vertical-align: middle;
      text-align: center;
      color: var(--el-button-text-color);
      svg {
        height: 20px;
        display: inline-block;
      }
    }
    &:hover {
      color: var(--el-color-primary);
    }
    &.active-item {
      color: var(--el-color-primary);
    }
  }
}
</style>
