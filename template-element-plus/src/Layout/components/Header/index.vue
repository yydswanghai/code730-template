<template>
  <div class="header">
    <div class="header-left">
      <!-- 菜单收起 -->
      <div class="trigger" @click="settingStore.toggleCollapse">
        <el-icon v-if="settingStore.collapsed" :size="18" class="i-icon"
          ><Fold
        /></el-icon>
        <el-icon v-else :size="18" class="i-icon"><Expand /></el-icon>
      </div>
      <!-- 刷新 -->
      <div
        class="trigger"
        v-if="settingStore.headerSetting.isReload"
        @click="reload"
      >
        <el-icon :size="18" class="i-icon"><RefreshRight /></el-icon>
      </div>
      <!-- 面包屑 -->
      <Breadcrumb />
    </div>
    <div class="header-right">
      <div class="trigger" v-if="showInput">
        <div class="input-wrap">
          <el-input v-model="inputVal" placeholder="please input"></el-input>
        </div>
      </div>
      <div class="trigger">
        <el-tooltip placement="bottom" content="搜索">
          <el-icon :size="18" @click="showInput = !showInput" class="i-icon"
            ><Search
          /></el-icon>
        </el-tooltip>
      </div>
      <div class="trigger">
        <el-tooltip placement="bottom" content="github">
          <a href="https://github.com/" target="_blank" style="color: inherit">
            <el-icon :size="18" class="i-icon"><Github /></el-icon>
          </a>
        </el-tooltip>
      </div>
      <div class="trigger">
        <el-tooltip placement="bottom" content="全屏">
          <el-icon :size="18" class="i-icon">
            <Fullscreen v-if="!isFullScreen" @click="toggleFullScreen(true)" />
            <FullscreenExit v-else @click="toggleFullScreen(false)" />
          </el-icon>
        </el-tooltip>
      </div>
      <div class="trigger">
        <el-dropdown class="user">
          <div class="avatar">
            <img :src="avatar" />
          </div>
          <template #dropdown>
            <div class="i-dropdown-menu">
              <div class="type">
                <span>{{ userDesc.type }}</span>
                <span>{{ userDesc.name }}</span>
              </div>
              <div class="desc">{{ userDesc.desc }}</div>
              <div class="line"></div>
              <div
                class="i-dropdown-menu-item"
                v-for="(val, key) in IDropdownEnum"
                :key="val + key"
                @click="handleDropdown($event, val)"
              >
                {{ key }}
              </div>
            </div>
          </template>
        </el-dropdown>
      </div>
      <div class="trigger" @click="openSetting">
        <el-tooltip placement="bottom-end" content="修改设置">
          <el-icon :size="18" class="i-icon">
            <SettingsOutline />
          </el-icon>
        </el-tooltip>
      </div>
      <AppSetting ref="appSettingRef" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useProjectSettingStore } from "@/store/modules/projectSetting";
import { useUserStore } from "@/store/modules/user";
import { Breadcrumb } from "../Breadcrumb/";
import { Fold, Expand, RefreshRight, Search } from "@element-plus/icons-vue";
import { Github, Fullscreen, FullscreenExit, SettingsOutline } from "@/icons/";
import { userEnum } from "@/enums/userEnum";
import { PageEnum } from "@/enums/pageEnum";
import { AppSetting } from "../AppSetting/";
import Avatar1 from "@/assets/avatar-1.svg?url";
import Avatar2 from "@/assets/avatar-2.svg?url";
import Avatar3 from "@/assets/avatar-3.svg?url";

defineOptions({
  name: "Header",
});
const reload = inject<() => void>("reload");
const settingStore = useProjectSettingStore();
const $router = useRouter();
const userStore = useUserStore();
/* 搜索 */
const inputVal = ref("");
const showInput = ref(false);
/* 个人中心 */
const avatar = ref();
const userDesc = {
  name: userStore.user_info?.username,
  desc: "整条街最靓的仔",
  type: "个人用户",
};
enum IDropdownEnum {
  个人设置 = "1",
  退出登录 = "2",
}
if (userStore.user_type === userEnum.system) {
  avatar.value = Avatar3;
  userDesc.type = "后台用户";
} else if (userStore.user_type === userEnum.user2) {
  avatar.value = Avatar2;
  userDesc.type = "组织用户";
} else {
  avatar.value = Avatar1;
}
async function handleDropdown(event: Event, val: string) {
  if (val === IDropdownEnum.个人设置) {
    console.log("个人设置");
  } else {
    await userStore.logout();
    $router.push(PageEnum.LOGIN);
  }
}
/* 全屏 */
const isFullScreen = ref(false);
// 全屏切换
function toggleFullScreen(flag: boolean) {
  isFullScreen.value = flag;
  if (flag) {
    // 关闭 -> 打开
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    }
  } else {
    // 打开 -> 关闭
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
/* 设置 */
const appSettingRef = ref<InstanceType<typeof AppSetting> | undefined>();
// 打开设置
function openSetting() {
  appSettingRef.value?.openSetting();
}
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  height: $header-height;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  transition: all 0.2s ease-in-out;
  width: 100%;
  z-index: 11;
  background-color: var(--i-head-bg-color);
}
.header-left {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.header-right {
  height: 100%;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .input-wrap {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .user {
    height: 100%;
    display: flex;
    align-items: center;
    .avatar {
      position: relative;
      overflow: visible;
      z-index: 1;
      width: 34px;
      height: 34px;
      img {
        width: 100%;
        height: 100%;
      }
      &::before {
        content: "";
        display: block;
        height: 100%;
        width: 100%;
        border-radius: 999px;
        position: absolute;
        z-index: -1;
        animation: wave 1.5s ease-out infinite;
        background: #2d3e37fc;
      }
    }
  }
}
.trigger {
  display: inline-block;
  width: auto;
  padding: 0 12px;
  height: 100%;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  .i-icon {
    display: flex;
    align-items: center;
    height: $header-height;
    line-height: $header-height;
    color: var(--i-head-primary-color);
  }
  &:hover {
    background: hsla(0, 0%, 100%, 0.08);
  }
}
.i-dropdown-menu {
  .type {
    font-size: 13px;
    color: rgb(24, 25, 28);
    span:first-of-type {
      color: #f80;
      margin-right: 4px;
    }
  }
  .desc {
    font-size: 12px;
    color: rgb(118, 124, 130);
  }
  .line {
    margin: 6px 0;
    border-top: 1px solid #ebeef5;
  }
}
@keyframes wave {
  25% {
    opacity: 0.75;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.1);
  }
  75% {
    opacity: 0.25;
    transform: scale(1.2);
  }
  100% {
    opacity: 0;
    transform: scale(1.3);
  }
}
</style>
