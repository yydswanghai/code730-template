<template>
    <section class="tab-container">
        <div class="area center">
            <a href="#">广州</a>
            <ArrowDownSFill width="18" />
        </div>
        <van-tabs class="tabs" v-model:active="active" @change="handleChange">
            <van-tab v-for="tab in tabs" :key="tab.id" :name="tab.name" :title="tab.title" />
        </van-tabs>
        <div class="search">
            <Search width="20" height="20" />
        </div>
    </section>
    <router-view />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Search, ArrowDownSFill } from '@/icons/'

const $router = useRouter();
const $route = useRoute();
const active = ref($route.path.replace(/\//, ''))

function handleChange(name: string | number) {
    $router.push(name as string)
}
const tabs = [
    { id: 1, title: '热映', name: 'index' },
    { id: 2, title: '影院', name: 'theater' },
    { id: 3, title: '待映', name: 'will_coming' },
    { id: 4, title: '经典电影', name: 'classic_movie' },
]
</script>
<style lang="scss" scoped>
.tab-container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    width: 100%;
    position: static;
    z-index: 10;
    .area{
        font-size: 14px;
        padding-left: 12px;
    }
    .tabs{
        padding: 0 12px;
        flex: 1 1 auto;
    }
    .search{
        padding-right: 12px;
        color: var(--van-primary-color);
    }
}
</style>