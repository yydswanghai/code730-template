<template>
    <div class="table-container">
        <el-card header="表格组件">
            <el-button type="primary">表格</el-button>
        </el-card>
        <el-radio-group v-model="radio" class="ml-4">
            <el-radio value="1" size="large">Option 1</el-radio>
            <el-radio value="2" size="large">Option 2</el-radio>
        </el-radio-group>
    </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Column-Table' });
const radio = ref('1')
</script>
<style lang="scss" scoped>

</style>