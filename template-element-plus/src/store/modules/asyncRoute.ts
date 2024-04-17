
import { constantRouter, asyncRouter } from '@/router'
import { IRouteRecordRaw } from '@/router/types'
import { PageEnum } from '@/enums/pageEnum'
import { userEnum } from '@/enums/userEnum'
import { useUserStore } from './user'
import { fetchMenu } from './helper'

export type IState = {
    routes: IRouteRecordRaw[]
    menus: IRouteRecordRaw[]
    keepAliveComponents: string[]
}

/**
 * 动态路由
 */
export const useAsyncRouteStore = defineStore('async-route', () => {
    const state = reactive<IState>({
        routes: [],// 用户路由
        menus: [],// 菜单 用于生成侧边栏
        keepAliveComponents: []// 缓存组件(组件name)
    });
    /* 设置路由 */
    function setRoutes(routers: IRouteRecordRaw[]) {
        state.routes = constantRouter.concat(routers);
    }
    /* 设置菜单 */
    function setMenus(menus: IRouteRecordRaw[]) {
        // 根据控制台的hidden决定是否添加到菜单中
        const DashboardRoute = constantRouter.find(it => it.name === PageEnum.HOME_NAME)!;
        if(!DashboardRoute.meta.hidden){
            state.menus = [DashboardRoute, ...menus];
        }else{
            state.menus = menus;
        }
    }
    /* 设置需要缓存的组件 */
    function setKeepAliveComponents(compNames: string[]) {
        state.keepAliveComponents = compNames;
    }
    /**
     * 生成路由
     * 后台用户根据接口生成
     * 其他用户，属于router/modules目录下的路由，通过权限列表去分配
     */
    async function generateRoutes(data: any){
        let accessedRouters: IRouteRecordRaw[] = [];
        const permissionsList: string[] = data.permissions || [];// 权限列表
        if(useUserStore().user_type === userEnum.system){
            const menus = await fetchMenu();
            if(menus?.length){
                accessedRouters = menus;
            }
        }else{
            accessedRouters = permissionsList.length ?
            asyncRouter.filter(it => permissionsList.includes(it.name)) : asyncRouter
        }
        setMenus(accessedRouters);
        setRoutes(accessedRouters);
        return toRaw(accessedRouters);
    }
    return {
        ...toRefs(state),
        setKeepAliveComponents,
        generateRoutes,
    }
});