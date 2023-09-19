import { IRoute } from './types'
/**
 * 嵌套菜单
 */
export default [
    { path: '/nest', name: '嵌套菜单', icon: 'local:apple', menuCode: '*',routes: [
            { path: 'sub1', component: './nest/sub1', menuCode: '*', name: '子菜单-sub'  },
            { path: 'sub2', component: './nest/sub2', menuCode: '*', name: '子菜单-sub2', routes: [
                    { path: 'sub3', component: './nest/sub3', menuCode: '*', name: '子菜单-sub3' },
                    { path: 'sub4', component: './nest/sub4', menuCode: '*', name: '子菜单-sub4' }
                ]
            },
            { path: 'sub5', component: './nest/sub5', menuCode: '*', name: '子菜单-sub5'  },
        ]
    }
] as IRoute[]