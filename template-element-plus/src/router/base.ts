import { IRouteRecordRaw } from './types'
import { renderIcon } from '@/utils/'
import { Dashboard } from '@/icons/'
import { PageEnum } from '@/enums/pageEnum'
import Layout from '@/Layout/index.vue';
import ErrorPage from '@/views/error-page/index.vue';
import DashboardComp from '@/views/menus/dashboard/index.vue'
import RedirectComp from '@/views/redirect/index.vue';
import LoginComp from '@/views/login/index.vue';

export const RootRoute: IRouteRecordRaw = {
    path: '/',
    name: 'Root',
    redirect: PageEnum.HOME,
    meta: { title: 'root' },
}

// 控制台
export const DashboardRoute: IRouteRecordRaw = {
    path:  PageEnum.HOME,
    name: PageEnum.HOME_NAME,
    component: Layout,
    meta: { title: '控制台', icon: renderIcon(Dashboard), sort: 0 },
    children: [
        {
            path: '',
            name: `${PageEnum.HOME_NAME}Index`,
            meta: { title: '控制台' },
            component: DashboardComp,
        },
    ]
}

// 刷新
export const RedirectRoute: IRouteRecordRaw = {
    path: PageEnum.REDIRECT,
    name: PageEnum.REDIRECT_NAME,
    component: Layout,
    meta: { title: 'Redirect' },
    children: [
        {
            path: '/redirect/:path(.*)',
            name: `${PageEnum.REDIRECT_NAME}Index`,
            component: RedirectComp,
            meta: { title: '刷新' },
        },
    ],
}

// 404
export const ErrorPageRoute: IRouteRecordRaw = {
    path: '/:path(.*)*',
    name: PageEnum.ERROR_NAME,
    component: Layout,
    meta: { title: 'ErrorPage' },
    children: [
        {
            path: '/:path(.*)*',
            name: `${PageEnum.ERROR_NAME}Index`,
            component: ErrorPage,
            meta: { title: 'ErrorPage' }
        }
    ]
}

// 登录
export const LoginRoute: IRouteRecordRaw = {
    path: '/login',
    name: 'Login',
    component: LoginComp,
    meta: { title: '登录' },
}

export { Layout, ErrorPage }