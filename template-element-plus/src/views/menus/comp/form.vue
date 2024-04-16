<template>
    <div class="form-container">
        <el-card header="表单组件">
            <el-button type="info">表单</el-button>
        </el-card>
        <div>测试缓存组件</div>
        <el-input v-model="input" style="width: 300px;" />
    </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Comp-From' });
const input = ref('')
</script>
<style lang="scss" scoped>

</style>