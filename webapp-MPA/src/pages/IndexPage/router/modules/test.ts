import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/test',
        name: 'Test',
        component: () => import('../../views/test.vue')
    }
]

export default routes;