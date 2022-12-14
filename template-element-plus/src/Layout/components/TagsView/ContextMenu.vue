<template>
    <el-dropdown class="tags-dropdown">
        <el-icon :size="20" class="tags-dropdown-icon"><ArrowDownOutline /></el-icon>
        <template #dropdown>
            <div class="i-dropdown-menu">
                <div class="i-dropdown-menu-item" v-for="item in contextMenuOptions" :key="item.key"
                    @click="selectContextMenu(item.key, item.disabled)" :class="{ disabled: item.disabled }">
                    <component v-if="item.icon" :is="item.icon" class="i-icon" />{{ item.label }}
                </div>
            </div>
        </template>
    </el-dropdown>
    <teleport to="body">
        <el-dropdown :style="{ top: top + 'px', left: left + 'px', position: 'absolute' }" v-show="showDropdown">
            <div class="i-dropdown-menu context-menu" ref="contextMenuRef" >
                <div class="i-dropdown-menu-item" v-for="item in contextMenuOptions" :key="item.key"
                    @click="selectContextMenu(item.key, item.disabled)" :class="{ disabled: item.disabled }">
                    <component v-if="item.icon" :is="item.icon" class="i-icon" />{{ item.label }}
                </div>
            </div>
        </el-dropdown>
    </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject, computed, PropType } from "vue"
import { useTagsViewStore, IRouteItem } from '@/store/modules/tagsView'
import { renderIcon } from '@/utils/'
import { useRoute, useRouter } from 'vue-router'
import { CloseRound, ReloadBlod, ColumnWidthOutline, MinusBaseline, ArrowDownOutline } from '@/icons/'
import { ElMessage } from 'element-plus'
import { PageEnum } from '@/enums/pageEnum'

export default defineComponent({
    name: 'ContextMenu',
    props: {
        top: Number,
        left: Number,
        activeKey: String,
        showDropdown: Boolean,
        isCurrent: Boolean,
        tagsList: {
            type: Array as PropType<IRouteItem[]>,
            required: true
        }
    },
    components: {
        ReloadBlod,
        CloseRound,
        ColumnWidthOutline,
        MinusBaseline,
        ArrowDownOutline
    },
    emits: ['updateNav', 'update:showDropdown', 'update:activeKey'],
    setup(props, ctx){
        const $route = useRoute();
        const $router = useRouter();
        const tagsViewStore = useTagsViewStore();
        const contextMenuRef = ref();
        enum contextMenuEnum {
            ????????????,
            ????????????,
            ????????????,
            ????????????
        }
        /* ???????????? */
        const contextMenuOptions = computed(() => {
            const isDisabled = props.tagsList.length <= 1;
            const isHome = props.activeKey === PageEnum.HOME;// ??????????????????????????????????????????
            return [
                {
                    label: '????????????',
                    key: contextMenuEnum.????????????,
                    disabled: false,
                    icon: renderIcon(ReloadBlod),
                },
                {
                    label: '????????????',
                    key: contextMenuEnum.????????????,
                    disabled: props.isCurrent || isDisabled,
                    icon: renderIcon(CloseRound),
                },
                {
                    label: '????????????',
                    key: contextMenuEnum.????????????,
                    disabled: isDisabled,
                    icon: renderIcon(ColumnWidthOutline),
                },
                {
                    label: '????????????',
                    key: contextMenuEnum.????????????,
                    disabled: isHome || isDisabled,
                    icon: renderIcon(MinusBaseline),
                },
            ]
        });
        /* ?????????????????? */
        function selectContextMenu(key: number, disabled: boolean) {
            if(disabled){
                return;
            }
            if(key === contextMenuEnum.????????????){
                reload && reload();
            }else if(key === contextMenuEnum.????????????){
                removeTab($route as IRouteItem);
            }else if(key === contextMenuEnum.????????????){
                closeOther($route as IRouteItem)
            }else if(key === contextMenuEnum.????????????){
                closeAll();
            }
            ctx.emit('updateNav');
            ctx.emit('update:showDropdown', false);
        }
        onMounted(() => {
            // ??????????????????????????????????????????????????????
            document.addEventListener('click', function (e: Event){
                if(!contextMenuRef.value?.contains(e.target)){
                    ctx.emit('update:showDropdown', false);
                }
            });
        });
        /* ?????? */
        const reload = inject<() => void>('reload');
        /* ?????????????????? */
        function removeTab(route: IRouteItem) {
            if(props.tagsList.length === 1){
                return ElMessage.warning('????????????????????????????????????????????????');
            }
            tagsViewStore.closeCurrentTag(route);
            // ???????????????????????????????????????????????????????????????
            if (props.activeKey === route.fullPath) {
                const currentRoute = props.tagsList[Math.max(0, props.tagsList.length -1)];
                ctx.emit('update:activeKey', currentRoute.fullPath);
                $router.push(currentRoute);
            }
        }
        /* ???????????? */
        function closeOther(route: IRouteItem) {
            tagsViewStore.closeOtherTags(route);
            $router.replace(route.fullPath);
        }
        /* ???????????? */
        function closeAll() {
            tagsViewStore.closeAllTags();
            $router.replace(PageEnum.HOME);
        }
        return {
            contextMenuRef,
            contextMenuOptions,
            selectContextMenu,
            removeTab,
        }
    }
})
</script>
<style lang="scss" scoped>
.tags-dropdown{
    min-width: 32px;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;
    .tags-dropdown-icon {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
.context-menu{
    position: absolute;
    z-index: 100;
    background: var(--el-bg-color-overlay);
    box-shadow: 0px 0px 12px rgb(0 0 0 / 12%);
}
.i-dropdown-menu-item{
    &.disabled{
        cursor: not-allowed;
        opacity: .5;
    }
    .i-icon{
        color: inherit;
    }
}
</style>