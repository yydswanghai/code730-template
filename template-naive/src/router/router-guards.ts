import { useAsyncRouteStore } from '@/store/modules/asyncRoute'
import { useUserStore } from '@/store/modules/user'
import { Router, RouteRecordRaw } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'
import { authEnum } from '@/enums/userEnum'
import { getStorage } from '@/utils/auth'
/**
 * 路由守卫
 */
const whiteList: string[] = [PageEnum.LOGIN]// 白名单

export function createRouterGuards(router: Router){

    router.beforeEach(async (to, from) => {
        const asyncRouteStore = useAsyncRouteStore()
        const userStore = useUserStore()
        const Loading = Reflect.get(window, '$loading') || null;
        // 开始进度条
        Loading && Loading.start();
        const hasToken = getStorage(authEnum.ACCESS_TOKEN);
        if(!hasToken){// 没有token
            // 不在白名单中
            if(!whiteList.includes(to.path)){
                return `${PageEnum.LOGIN}?redirect=${to.path}`;
            }else{
                return;
            }
        }
        if(to.path === PageEnum.LOGIN){
            // 如果已登录，则重定向到主页
            return { path: '/' };
        }
        const hasInfo = userStore.user_info;
        if(!hasInfo){// 有token，但没有用户信息
            try {
                const userInfo = await userStore.getInfo();
                const routes = await asyncRouteStore.generateRoutes(userInfo);
                // 动态添加可访问路由表
                routes.forEach(item => {
                    router.addRoute(item as RouteRecordRaw)
                });
                return to.fullPath;
            } catch (error) {
                // 获取用户信息出错
                await userStore.logout();
                return `${PageEnum.LOGIN}?redirect=${to.path}`;
            }
        }
        return;
    });

    router.afterEach((to, _, failure) => {
        const asyncRouteStore = useAsyncRouteStore()
        // 设置标题
        document.title = to?.meta?.title as string || document.title;
        // 在这里设置需要缓存的组件名称
        const keepAliveComponents = asyncRouteStore.keepAliveComponents;
        // 当前组件名
        const currentComName = to.matched.find(it => it.name == to.name)?.name as string;
        // 如果当前组件不在缓存组件数组里，并且开启 meta.keepAlive
        if(currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.keepAlive){
            keepAliveComponents.push(currentComName)// 缓存的当前组件名
        }else if(!to.meta?.keepAlive || to.name == PageEnum.REDIRECT_NAME){
            // 不需要缓存的组件
            const index = asyncRouteStore.keepAliveComponents.findIndex(name => name == currentComName);
            if (index !== -1) {
                keepAliveComponents.splice(index, 1)
            }
        }
        asyncRouteStore.setKeepAliveComponents(keepAliveComponents)
        const Loading = Reflect.get(window, '$loading') || null;
        Loading && Loading.finish()
    });

    router.onError((error) => {
        console.log(error, '路由错误')
    })
}