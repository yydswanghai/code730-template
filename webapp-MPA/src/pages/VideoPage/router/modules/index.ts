import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Tab',
        component: () => import('../../views/Index/tab.vue'),
        redirect: '/index',
        children: [
            {
                path: 'index',
                name: 'Tab_Index',
                component: () => import('../../views/Index/index.vue')
            },
            {
                path: 'cropper',
                name: 'Tab_Cropper',
                component: () => import('../../views/Index/cropper.vue')
            },
            {
                path: 'interpretation',
                name: 'Tab_Interpretation',
                component: () => import('../../views/Index/interpretation.vue')
            },
            {
                path: 'commentary',
                name: 'Tab_Commentary',
                component: () => import('../../views/Index/commentary.vue')
            },
            {
                path: 'entertainment',
                name: 'Tab_Entertainment',
                component: () => import('../../views/Index/entertainment.vue')
            }
        ]
    }
]

export default routes;