import { defineApp, matchRoutes } from 'umi'
import { getPreEditMyInfo } from '@/api/users'
/**
 * @name 运行时配置
 * @doc https://umijs.org/docs/api/runtime-config
 */

export default defineApp({
    onRouteChange(args) {
        const { clientRoutes, location } = args;
        const route = matchRoutes(clientRoutes, location.pathname)?.pop()?.route;
        if(route){
            document.title = (route as any).name || '';
        }
    },
    /**
     * routes 打平的路由列表
     * routeComponents 路由对应的组件映射
     */
    patchRoutes(args){
        // const { routes, routeComponents } = args;
    },
    render(oldRender){
        // 判断用户是否登录？
        getPreEditMyInfo().then(r => {
            console.log(r)
        })
        oldRender()
    }
})