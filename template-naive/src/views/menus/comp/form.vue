<template>
    <div class="form-container">
        <n-card title="表单组件">
            <n-button>表单</n-button>
        </n-card>
        <div>测试缓存组件</div>
        <n-input v-model="input" style="width: 300px;" />
    </div>
</template>

<script lang="ts" setup name="Comp-From">
import { ref } from 'vue';
const input = ref('')
</script>
<style lang="scss" scoped>

</style>