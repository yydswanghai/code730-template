<template>
  <div class="tags-container">
    <span class="tags-prev" :class="{ 'tags-hide': !scrollable }" @click="scrollPrev">
        <el-icon :size="16" color="#515a6e" class="icon"><ArrowLeftOutline /></el-icon>
    </span>
    <span class="tags-next" :class="{ 'tags-hide': !scrollable }" @click="scrollNext">
      <el-icon :size="16" color="#515a6e" class="icon"><ArrowRightOutline /></el-icon>
    </span>
    <div ref="contentRef" class="tags-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowLeftOutline, ArrowRightOutline } from "@/icons/";

defineOptions({ name: 'TagsContainer' })

const props = defineProps<{
  active: string
}>();
  
const scrollable = ref(false); // 是否可滚动
const contentRef = ref<HTMLDivElement | null>(null);

/* 是否开启滚动功能 */
async function updateNavScroll(auto?: boolean) {
  await nextTick();
  if (!contentRef.value) return;
  // 出现滚动条时  offsetWidth < scrollWidth
  // 不出现滚动条时 offsetWidth = scrollWidth
  const { offsetWidth, scrollWidth } = contentRef.value;
  if (offsetWidth < scrollWidth) {
    scrollable.value = true;
    _autoScroll(auto);
  } else {
    scrollable.value = false;
  }
}
/* 自动让元素出现在当前可视区域内 */
function _autoScroll(auto?: boolean) {
  if (contentRef.value && auto) {
    let nodeList = contentRef.value.querySelectorAll(".tags-scroll-item") || [];
    Array.of(...nodeList).forEach((tag: any) => {
      if (tag.id === `tag${props.active.split("/").join("\/")}`) {
        // scrollIntoView 让当前的元素滚动到浏览器窗口的可视区域内。
        // Detail: https://developer.mozilla.org/zh-CN/docs/web/api/element/scrollintoview
        tag.scrollIntoView && tag.scrollIntoView();
      }
    });
  }
}
/**
 * @param value 要滚动到的位置
 * @param amplitude 每次滚动的长度
 */
function _scrollTo(value: number, amplitude: number): any {
  if (!contentRef.value) return;
  const currentScroll = contentRef.value.scrollLeft;// 水平方向上滚动像素
  const scrollWidth =
    (amplitude > 0 && currentScroll + amplitude >= value) ||
    (amplitude < 0 && currentScroll + amplitude <= value)
      ? value
      : currentScroll + amplitude;
  contentRef.value?.scrollTo(scrollWidth, 0);
  if (scrollWidth === value) return;
  return window.requestAnimationFrame(() => _scrollTo(value, amplitude));
}
/* 向前滚动 */
function scrollPrev() {
  if (!contentRef.value) return;
  const currentScroll = contentRef.value.scrollLeft;
  if (!currentScroll) return;
  const offsetWidth = contentRef.value.offsetWidth;
  const scrollLeft = currentScroll > offsetWidth ? currentScroll - offsetWidth : 0;
  _scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20);
}
/* 向后滚动 */
function scrollNext() {
  if (!contentRef.value) return;
  const offsetWidth = contentRef.value.offsetWidth;
  const tagsWidth = contentRef.value.scrollWidth;
  const currentScroll = contentRef.value.scrollLeft;
  if (tagsWidth - currentScroll <= offsetWidth) return;
  const scrollLeft = tagsWidth - currentScroll > offsetWidth * 2
      ? currentScroll + offsetWidth
      : tagsWidth - offsetWidth;
  _scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20);
}
onMounted(() => {
  updateNavScroll();
});
defineExpose({
  updateNavScroll
});
</script>
<style lang="scss" scoped>
.tags-container {
  -webkit-box-flex: 1;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: hidden;
  display: flex;
  .tags-prev,
  .tags-next {
    width: 32px;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      width: 32px;
    }
  }
  .tags-prev {
    order: 1;
  }
  .tags-next {
    order: 3;
  }
  .tags-hide {
    display: none;
  }
  .tags-content {
    order: 2;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
