<template>
  <div>
    <router-view v-slot="{ Component, route }">
      <transition :name="getTransitionName" mode="out-in" appear>
        <keep-alive v-if="keepAliveComponents" :include="keepAliveComponents">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component v-else :is="Component" :key="route.fullPath" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { useProjectSettingStore } from "@/store/modules/projectSetting";
import { useAsyncRouteStore } from "@/store/modules/asyncRoute";

defineOptions({
  name: "Main",
});
const settingStore = useProjectSettingStore();
const asyncRouteStore = useAsyncRouteStore();
/* 动画名称：不使用动画设置为 '' 就可以 */
const getTransitionName = computed(() => {
  return settingStore.animateSetting.open
    ? settingStore.animateSetting.type
    : "";
});
const keepAliveComponents = computed(() => asyncRouteStore.keepAliveComponents);
</script>
