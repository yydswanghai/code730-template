<template>
  <a
    v-if="isExternalLink"
    v-bind="$attrs"
    :href="(to as string)"
    target="_blank"
  >
    <slot />
  </a>
  <router-link
    v-else
    v-bind="$props"
    custom
    v-slot="{ isActive, href, navigate }"
  >
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="isActive ? activeClass : defaultClass"
    >
      <slot />
    </a>
  </router-link>
</template>

<script lang="ts" setup>
// Detail: https://router.vuejs.org/zh/api/
import { RouterLink, RouterLinkProps } from "vue-router";

defineOptions({
  name: "AppLink",
});
type IProps = RouterLinkProps & {
  inactiveClass?: string;
};
const props = defineProps<IProps>();
const isExternalLink = computed(
  () => typeof props.to === "string" && props.to.startsWith("http")
);

// 如果没有传递 inactiveClass，则使用默认的样式
const defaultClass = props.inactiveClass || "";
</script>
