import type { DvaModel } from 'umi'
import { plainArray } from '@/utils/index'

interface IState {
    routes: any[]
    menus: any[]
}

const model: DvaModel<IState> = {
    namespace: 'asyncRoute',
    state: {
        routes: [],
        menus: [],
    },
    reducers: {
        setRoutes(state: IState, action: any){
            return { ...state, routes: action.payload }
        },
        setMenus(state: IState, action: any){
            return { ...state, menus: action.payload }
        }
    },
    effects: {
        *generateRoutes(action, { call, select, put }): any{
            const res = yield call(fetchMenu);
            const routes = yield select((rootState: any) => rootState.asyncRoute.routes);

            const layoutRoutes = routes.find((it: any) => it.id === '@@/global-layout').children;
            // 包含该帐号的所有菜单权限列表
            let menuCodes = plainArray(res.data).map(it => it.menuCode);
            const result = filterRoutes(layoutRoutes, [...menuCodes, '*'])
            yield put({ type: 'setMenus', payload: result })
        }
    }
}
/**
 * 请求接口获取菜单
 */
async function fetchMenu() {
    try {
        const res = await fetch('/v2/api/gdzyz/manage/pc/common/menutree/leftMenu');
        if(res.status === 200){
            return res.json();
        }
        return null;
    } catch (err) {
        console.log(err);
    }
}
/**
 * 根据权限menuCode字段过滤路由
 * 1. 必须有menuCode字段
 * 2. 并且必须在菜单权限列表内
 */
function filterRoutes(routes: any[], menuCodes: string[]) {
    return routes.filter((rout: any) => {
        if(rout.children){
            rout.children = filterRoutes(rout.children, menuCodes)
        }
        if(rout.menuCode && menuCodes.includes(rout.menuCode)){
            return true
        }
        return false
    })
}

export default model