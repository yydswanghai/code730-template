<template>
    <div class="tags-view-container" :style="styleObj">
        <div class="tags-view-main">
            <div ref="tagsWrapRef" class="tags" :class="{ 'tags-scrollable': scrollable }">
                <span class="tags-prev" :class="{ 'tags-hide': !scrollable }" @click="scrollPrev">
                    <n-icon size="16" color="#515a6e"><LeftOutlined /></n-icon>
                </span>
                <span class="tags-next" :class="{ 'tags-hide': !scrollable }" @click="scrollNext">
                    <n-icon size="16" color="#515a6e"><RightOutlined /></n-icon>
                </span>
                <div ref="tagsScrollRef" class="tags-scroll">
                    <Draggable :list="tagsList" animation="300" item-key="fullPath" class="tags-draggable">
                        <template #item="{ element }">
                            <div class="tags-scroll-item"
                                :class="{ 'active-item': activeKey === element.path }"
                                :id="`tag${element.fullPath.split('/').join('\/')}`"
                                @click.stop="handleToPage(element)"
                                @contextmenu="handleContextMenu($event, element)"
                                >
                                <span>{{ element.meta.title }}</span>
                                <n-icon size="14" @click.stop="handleCloseTagItem(element)"
                                    v-if="element.path !== PageEnum.HOME"
                                >
                                    <CloseOutlined />
                                </n-icon>
                            </div>
                        </template>
                    </Draggable>
                </div>
            </div>
            <!-- δΈζθε -->
            <ContextMenu
                ref="contextMenuRef"
                v-model:showDropdown="showDropdown"
                v-model:activeKey="activeKey"
                :top="contextMenuY"
                :left="contextMenuX"
                :isCurrent="isCurrent"
                :tagsList="tagsList"
                @update-nav="updateNavScroll()"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, toRefs, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useThemeVars } from 'naive-ui'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { useTagsViewStore, initTagsViewStore, IRouteItem } from '@/store/modules/tagsView'
import ContextMenu from './ContextMenu.vue'
import Draggable from 'vuedraggable'
import { LeftOutlined, RightOutlined, CloseOutlined } from '@vicons/antd'
import { PageEnum } from '@/enums/pageEnum'
import { isExternal } from '@/utils/'

export default defineComponent({
    name: 'TagsView',
    components: {
        ContextMenu,
        Draggable,
        LeftOutlined,
        RightOutlined,
        CloseOutlined,
    },
    setup(){
        const $route = useRoute();
        const $router = useRouter();
        const settingStore = useProjectSettingStore();
        const tagsViewStore = useTagsViewStore();
        const themeVars = useThemeVars();
        const tagsWrapRef = ref(null)
        const tagsScrollRef = ref<HTMLDivElement | null>(null)
        const contextMenuRef = ref();
        const state = reactive({
            activeKey: $route.fullPath,// ε½ει‘΅ι’key
            scrollable: false,// ε―ζ»ε¨
            contextMenuX: 0,
            contextMenuY: 0,
            showDropdown: false,// δΈζθε
            isCurrent: false,
            isMultiHeaderFixed: false,
        });
        const collapsed = computed(() => settingStore.collapsed);
        const styleObj = computed(() => {
            const { navMode, menuSetting : { menuWidth, minMenuWidth }, tagsViewSetting: { fixed } } = settingStore;
            const w = collapsed.value ? minMenuWidth : menuWidth;
            if(navMode === 'horizontal' || !fixed){
                return { width: `100%`, left: '0' }
            }else{
                return { width: `calc(100% - ${w}px)`, left: `${w}px` }
            }
        });
        const getCardColor = computed(() => themeVars.value.cardColor)
        const getBaseColor = computed(() => themeVars.value.textColor1)
        const primaryColor = computed(() => settingStore.themeSetting.primary)
        // θ·εη?ζθ·―η±ε―Ήθ±‘οΌζ·»ε addTagsηζΆεε?ΉζεΊη°ιε€ζ η­Ύθ’«ζ·»ε ηbug
        function getSimpleRoute(route: IRouteItem) {
            const { fullPath, hash, meta, name, params, path, query } = route;
            return { fullPath, hash, meta, name, params, path, query };
        }
        // εε§εζ η­Ύι‘΅
        initTagsViewStore(getSimpleRoute($route as IRouteItem));

        const tagsList = computed(() => tagsViewStore.tagsList);

        // θ·―η±ζΉεζΆεζ·»ε ζ°ηtag
        watch(() => $route.fullPath, (to) => {
            if(!isExternal(to)){// θ·³θΏε€ι¨ιΎζ₯γε·ζ°δΈζ·»ε 
                state.activeKey = to;
                tagsViewStore.addTags(getSimpleRoute($route as IRouteItem));
                updateNavScroll(true);
            }
        }, { immediate: true });

        /* ζ―ε¦εΌε―ζ»ε¨εθ½ */
        async function updateNavScroll(autoScroll?: boolean) {
            await nextTick()
            if(!tagsScrollRef.value) return;
            const offsetWidth = tagsScrollRef.value.offsetWidth;// εη΄ ζ¬θΊ«ηε?½εΊ¦ width+padding+border
            const tagsWidth = tagsScrollRef.value.scrollWidth;// εΊη°ζ»ε¨ζ‘ζΆοΌεζ¬θΆεΊθε΄ηε?½εΊ¦
            if(offsetWidth < tagsWidth){// εΊη°ζ»ε¨ζ‘
                state.scrollable = true;// ζΎη€Ίε·¦ε³ηΉε»ζι?
                if(autoScroll){
                    let tagList = tagsScrollRef.value.querySelectorAll('.tags-scroll-item') || [];
                    Array.of(tagList).forEach((tag: any) => {
                        if (tag.id === `tag${state.activeKey.split('/').join('\/')}`) {
                            // scrollIntoView θ?©ε½εηεη΄ ζ»ε¨ε°ζ΅θ§ε¨ηͺε£ηε―θ§εΊεεγ
                            // Detail: https://developer.mozilla.org/zh-CN/docs/web/api/element/scrollintoview
                            tag.scrollIntoView && tag.scrollIntoView()
                        }
                    })
                }
            }else{
                state.scrollable = false;
            }
        }
        /**
         * @param value θ¦ζ»ε¨ε°ηδ½η½?
         * @param amplitude ζ―ζ¬‘ζ»ε¨ηιΏεΊ¦
         */
        function scrollTo(value: number, amplitude: number): any {
            if(!tagsScrollRef.value){
                return;
            }
            const currentScroll = tagsScrollRef.value.scrollLeft;
            const scrollWidth =
                (amplitude > 0 && currentScroll + amplitude >= value) ||
                (amplitude < 0 && currentScroll + amplitude <= value)
                    ? value : currentScroll + amplitude;
            tagsScrollRef.value && tagsScrollRef.value.scrollTo(scrollWidth, 0);
            if (scrollWidth === value) return;
            return window.requestAnimationFrame(() => scrollTo(value, amplitude));
        }
        /* εεζ»ε¨ */
        function scrollPrev() {
            if(!tagsScrollRef.value){
                return;
            }
            const offsetWidth = tagsScrollRef.value.offsetWidth;
            const currentScroll = tagsScrollRef.value.scrollLeft;
            if (!currentScroll) return
            const scrollLeft = currentScroll > offsetWidth ? currentScroll - offsetWidth : 0;
            scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20);
        }
        /* εεζ»ε¨ */
        function scrollNext() {
            if(!tagsScrollRef.value){
                return;
            }
            const offsetWidth = tagsScrollRef.value.offsetWidth;
            const tagsWidth = tagsScrollRef.value.scrollWidth;
            const currentScroll = tagsScrollRef.value.scrollLeft;
            if (tagsWidth - currentScroll <= offsetWidth) return;
            const scrollLeft =
                tagsWidth - currentScroll > offsetWidth * 2 ?
                currentScroll + offsetWidth : tagsWidth - offsetWidth;
            scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20);
        }
        /* εζ’ε°ε―ΉεΊηι‘΅ι’ */
        function handleToPage(element: IRouteItem) {
            const { fullPath } = element;
            if(fullPath === $route.fullPath) return;
            state.activeKey = fullPath;
            $router.push({ path: fullPath });
        }
        // ε³ι?θε
        function handleContextMenu(event: MouseEvent, element: IRouteItem) {
            event.preventDefault();
            state.isCurrent = PageEnum.HOME === element.path;
            state.showDropdown = false;
            nextTick().then(() => {
                state.showDropdown = true;
                state.contextMenuX = event.clientX;
                state.contextMenuY = event.clientY;
            })
        }
        // ε³ι­ζ η­Ύ
        function handleCloseTagItem(element: IRouteItem) {
            const route = tagsList.value.find(it => it.fullPath === element.fullPath);
            route && contextMenuRef.value?.removeTab(route);
        }
        return {
            ...toRefs(state),
            PageEnum,
            tagsWrapRef,
            tagsScrollRef,
            contextMenuRef,
            tagsList,
            styleObj,
            updateNavScroll,
            scrollPrev,
            scrollNext,
            handleToPage,
            handleContextMenu,
            handleCloseTagItem,
            getCardColor,
            getBaseColor,
            primaryColor,
        }
    }
})
</script>
<style lang="scss" scoped>
.tags-view-container{
    width: 100%;
    padding: 6px 0;
    display: flex;
    transition: all 0.2s ease-in-out;
    box-sizing: border-box;
    .tags-view-main{
        height: 32px;
        display: flex;
        max-width: 100%;
        min-width: 100%;
    }
    .tags{
        -webkit-box-flex: 1;
        flex-grow: 1;
        flex-shrink: 1;
        overflow: hidden;
        position: relative;
        .tags-prev,
        .tags-next{
            width: 32px;
            text-align: center;
            position: absolute;
            line-height: 32px;
            cursor: pointer;
            .n-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 32px;
                width: 32px;
            }
        }
        .tags-prev{
            left: 0;
        }
        .tags-next{
            right: 0;
        }
        .tags-hide{
            display: none;
        }
        &.tags-scrollable{
            padding: 0 32px;
            overflow: hidden;
        }
        .tags-scroll{
            width: 100%;
            height: 100%;
            white-space: nowrap;
            overflow: hidden;
            .tags-draggable{
                display: flex;
                width: 100%;
                height: 100%;
            }
            .tags-scroll-item{
                background: v-bind(getCardColor);
                color: v-bind(getBaseColor);
                height: 32px;
                padding: 6px 16px 4px;
                border-radius: 3px;
                margin-right: 6px;
                cursor: pointer;
                display: inline-block;
                position: relative;
                flex: 0 0 auto;
                box-sizing: border-box;
                span{
                    float: left;
                    vertical-align: middle;
                }
                .n-icon {
                    height: 22px;
                    width: 21px;
                    margin-right: -6px;
                    position: relative;
                    vertical-align: middle;
                    text-align: center;
                    color: #808695;
                    &:hover {
                        color: #515a6e !important;
                    }
                    svg {
                        height: 21px;
                        display: inline-block;
                    }
                }
                &:hover {
                    color: #515a6e;
                }
                &.active-item{
                    color: v-bind(primaryColor);
                }
            }
        }
    }
}
</style>