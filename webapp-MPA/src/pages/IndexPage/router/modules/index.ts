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
                path: 'theater',
                name: 'Tab_Theater',
                component: () => import('../../views/Index/theater.vue')
            },
            {
                path: 'will_coming',
                name: 'Tab_WillComing',
                component: () => import('../../views/Index/will_coming.vue')
            },
            {
                path: 'classic_movie',
                name: 'Tab_ClassicMovie',
                component: () => import('../../views/Index/classic_movie.vue')
            },
        ]
    }
]

export default routes;