<template>
    <section class="tab-container">
        <van-tabs v-model:active="active" @change="handleChange">
            <van-tab v-for="tab in tabs" :key="tab.id" :name="tab.name" :title="tab.title" />
        </van-tabs>
    </section>
    <router-view />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const $router = useRouter();
const $route = useRoute();
const active = ref($route.path.replace(/\//, ''))

function handleChange(name: string | number) {
    $router.push(name as string)
}
const tabs = [
    { id: 1, title: 'h5摄像头', name: 'index' },
    { id: 2, title: '图片裁剪', name: 'cropper' },
    { id: 3, title: '热片解读', name: 'interpretation' },
    { id: 4, title: '说电影', name: 'commentary' },
    { id: 5, title: '娱乐', name: 'entertainment' },
]
</script>