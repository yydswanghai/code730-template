import { RouteLocationNormalizedLoaded } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'

export type IRouteItem = Partial<RouteLocationNormalizedLoaded> & {
    fullPath: string
    name: string
}

export type ITagsViewState = {
    tagsList: IRouteItem[]// 标签页
}

/* 不需要出现在标签页中的路由 */
const whiteList: string[] = [`${PageEnum.REDIRECT_NAME}Index`, `${PageEnum.ERROR_NAME}Index`, PageEnum.LOGIN_NAME];

/* 返回所有路由里 meta:{ affix: true } 的 `标签` */
function retainAffixRoute(list: IRouteItem[]) {
    return list.filter(it => it?.meta?.affix ?? false);
}

/**
 * 标签
 */
export const useTagsViewStore = defineStore('tags-view', () => {
    const state = reactive<ITagsViewState>({
        tagsList: []
    });
    /* 初始化标签页 */
    function initTags(routes: IRouteItem[]) {
        state.tagsList = routes;
    }
    /* 添加标签页 */
    function addTags(route: IRouteItem) {
        if (whiteList.includes(route.name)) return false;
        const isExists = state.tagsList.some(it => it.fullPath == route.fullPath);
        if (!isExists) {// 不存在则添加
            state.tagsList.push(route);
        }
        return true;
    }
    /* 关闭其他 */
    function closeOtherTags(route: IRouteItem) {
        state.tagsList = state.tagsList.filter(it => {
            if(it.fullPath === PageEnum.HOME || it.fullPath === route.fullPath){
                return true;
            }
            return false;
        });
    }
    /* 关闭当前页 */
    function closeCurrentTag(route: IRouteItem) {
        const index = state.tagsList.findIndex(it => it.fullPath == route.fullPath);
        state.tagsList.splice(index, 1);
    }
    /* 关闭全部 */
    function closeAllTags() {
        // 重新赋值，仅有设置了 meta:{ affix: true } 的保留
        state.tagsList = retainAffixRoute(state.tagsList);
        localStorage.removeItem(useTagsViewStore().$id);
    }
    return {
        ...toRefs(state),
        initTags,
        addTags,
        closeOtherTags,
        closeCurrentTag,
        closeAllTags
    }
});

export function initTagsViewStore(route: IRouteItem) {
    const instance = useTagsViewStore();

    // 初始化
    const localTags = localStorage.getItem(instance.$id);
    const cacheRoutes: IRouteItem[] = localTags ? JSON.parse(localTags) : [route];
    instance.initTags(cacheRoutes);

    // 订阅数据变化，变化时存储
    instance.$subscribe((_, state) => {
        localStorage.setItem(instance.$id, JSON.stringify(state.tagsList));
    });

    // 在页面关闭或刷新之前，保存数据
    window.addEventListener('beforeunload', () => {
        localStorage.setItem(instance.$id, JSON.stringify(instance.$state.tagsList));
    });
}