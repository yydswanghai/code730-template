<template>
    <div class="error-page-container">
        <img :src="notFountImg" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import notFountImg from "@/assets/404.svg?url";
export default defineComponent({
    setup(){
        return {
            notFountImg
        }
    }
})
</script>
<style lang="scss" scoped>
.error-page-container{
    width: 100%;
    img{
        width: 70%;
        margin: 20px auto;
        display: block;
    }
}
</style>