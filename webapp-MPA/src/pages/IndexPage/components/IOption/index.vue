<template>
    <div class="option-area">
        <van-dropdown-menu>
            <van-dropdown-item title="全城">
                <component :is="City" />
            </van-dropdown-item>
            <van-dropdown-item title="品牌">
                <component :is="Brand" />
            </van-dropdown-item>
            <van-dropdown-item title="特色">
                <component :is="Feature" />
            </van-dropdown-item>
        </van-dropdown-menu>
    </div>
</template>

<script lang="ts" setup>
import City from './City.vue'
import Brand from './Brand.vue'
import Feature from './Feature.vue'

</script>
<style lang="scss" scoped>
.option-area{
    width: 100%;
    height: auto;
    background-color: #fff;
    position: fixed;
    top: 158px;
    z-index: 120;
    .van-tabs{
        :deep(.van-tabs__line){
            display: none;
        }
    }
    .option-container{
        width: 100%;
        height: 38px;
        margin: 0 auto;
        padding: 0 18px;
        box-sizing: border-box;
        border-bottom: 1px solid #eaeaea;
        border-top: 1px solid #eaeaea;
        :deep(.van-tabs__wrap){
            width: 100%;
            height: 100%;
            .van-tabs__nav{
                display: flex;
                align-items: center;
            }
            .van-tab{
                height: 24px;
                // border-right: 1px solid #b0b0b0;
                .van-tab__text::after{
                    content: "";
                    width: 0;
                    height: 0;
                    border: 4px solid transparent;
                    border-top-color: #b0b0b0;
                    margin: 4px 4px 0 4px;
                    position: absolute;
                    top: 25%;
                }
                &.van-tab--active{
                    .van-tab__text::after{
                        transform: rotate(180deg);
                        border-top-color: var(--van-tab-active-text-color);
                        top: 0;
                    }
                }
            }
        }
    }
}
</style>