import { IRouteRecordRaw } from './types'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { RootRoute, DashboardRoute, RedirectRoute, LoginRoute, ErrorPageRoute } from './base'
import { isExternal } from '@/utils/'

/* 加载modules目录下的所有文件 */
const modules: Record<string, any> = import.meta.glob('./modules/**/*.ts', { eager: true, import: 'default' });
const routeModuleList: IRouteRecordRaw[] = [];
Object.keys(modules).forEach((key) => {
    const mod = modules[key] || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    modList.forEach(it => {
        if(isExternal(it.path)){// 外部链接
            it.path = `/${it.path}`;
        }
    });
    routeModuleList.push(...modList);
});
/* 按照 meta.sort 排序 */
function sortRoute(a: IRouteRecordRaw, b: IRouteRecordRaw) {
    return (a.meta?.sort || 0) - (b.meta?.sort || 0);
}
routeModuleList.sort(sortRoute);

// 固定的路由 无需验证权限
export const constantRouter = [RootRoute, DashboardRoute, RedirectRoute, LoginRoute, ErrorPageRoute];

// 用户端写死的路由，如果不是通过后端请求到的，则就使用这个路由
export const asyncRouter = [...routeModuleList];

const router = createRouter({
    history: createWebHashHistory(''),
    routes: constantRouter as RouteRecordRaw[],
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
});

export { router }