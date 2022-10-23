import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'

/* 加载modules目录下的所有文件 */
const modules = import.meta.glob('./modules/**/*.ts', { eager: true, import: 'default', });
const routeModuleList: RouteRecordRaw[] = [];
Object.keys(modules).forEach((key) => {
    const def = modules[key];
    const defList = Array.isArray(def) ? [...def] : [def];
    routeModuleList.push(...defList);
})

const router = createRouter({
    history: createWebHashHistory(),
    routes: routeModuleList,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
})

export { router }