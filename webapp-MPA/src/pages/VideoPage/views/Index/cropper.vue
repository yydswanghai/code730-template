<template>
    <div>
        <div class="avatar">
            <img :src="avatar" v-if="avatar">
            <img src="~@/assets/avatar.jpeg" v-else />
        </div>
        <ICropper @get-data="getData" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ICropper } from '@/components/ICropper/'

const avatar = ref('');
function getData(src: string) {
    avatar.value = src;
}
</script>
<style lang="scss" scoped>
.avatar{
    width: 50%;
    display: block;
    padding: 20px;
    margin: 0 auto;
    img{
        width: 100%;
    }
}
</style>