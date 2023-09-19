import { IRoute } from './types'
/**
 * 个人中心
 */
export default [
    {
        path: '/personal', name: '个人中心', icon: 'local:personal', menuCode: "personal_center",
        routes: [
            { path: '', component: './personal/index', name: '个人中心', menuCode: "personal_center" },
            { path: 'message', component: './personal/message', name: '我的消息', menuCode: "personal_message_list" },
        ]
    }
] as IRoute[]