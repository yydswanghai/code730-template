<template>
    <div class="table-container">
        <n-card title="表格组件">
            <n-button type="primary">表格</n-button>
        </n-card>
        <n-radio-group v-model:value="radio" name="radiogroup">
            <n-radio value="1">option1</n-radio>
            <n-radio value="2">option2</n-radio>
        </n-radio-group>
    </div>
</template>

<script lang="ts" setup name="Column-Table">
import { ref } from 'vue';

const radio = ref('1')
</script>
<style lang="scss" scoped>

</style>