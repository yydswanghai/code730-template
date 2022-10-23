import { MockMethod } from 'vite-plugin-mock'

const menus = [
    {
        id: 1000,
        parent_id: '-1',
        path: '/commendation',
        name: 'Commendation',
        type: false,
        permission: null,
        component: 'LAYOUT',
        redirect: '/commendation/list',
        meta_sort: 1000,
        meta_title: '表彰管理',
        meta_icon: 'Commendation',
        meta_keep_alive: false,
        meta_hidden: false,
        meta_always_show: false,
        meta_affix: false
    },
    {
        id: 1010,
        parent_id: '1000',
        path: 'list',
        name: 'CommendationList',
        type: true,
        permission: 'commend_list',
        component: '/commendation/index',
        redirect: null,
        meta_sort: 1010,
        meta_title: '表彰列表',
        meta_icon: null,
        meta_keep_alive: false,
        meta_hidden: false,
        meta_always_show: false,
        meta_affix: false
    },
    {
        id: 1020,
        parent_id: '1000',
        path: 'add',
        name: 'CommendationAdd',
        type: true,
        permission: 'commend_add',
        component: '/commendation/add',
        redirect: null,
        meta_sort: 1020,
        meta_title: '新增表彰',
        meta_icon: null,
        meta_keep_alive: false,
        meta_hidden: false,
        meta_always_show: false,
        meta_affix: false
    },
    {
        id: 1030,
        parent_id: '1000',
        path: 'edit',
        name: 'CommendationEdit',
        type: true,
        permission: 'commend_edit',
        component: '/commendation/edit',
        redirect: null,
        meta_sort: 1030,
        meta_title: '编辑表彰',
        meta_icon: null,
        meta_keep_alive: false,
        meta_hidden: false,
        meta_always_show: false,
        meta_affix: false
    },
    {
        id: 1040,
        parent_id: '1000',
        path: 'detail',
        name: 'CommendationDetail',
        type: true,
        permission: 'commend_detail',
        component: '/commendation/detail',
        redirect: null,
        meta_sort: 1040,
        meta_title: '表彰明细',
        meta_icon: null,
        meta_keep_alive: false,
        meta_hidden: false,
        meta_always_show: false,
        meta_affix: false
    },
    {
        id: 2000,
        parent_id: '-1',
        path: '/organization',
        name: 'Organization',
        type: false,
        permission: null,
        component: 'LAYOUT',
        redirect: '/organization/index',
        meta_sort: 2000,
        meta_title: '组织管理',
        meta_icon: 'Organization',
        meta_keep_alive: false,
        meta_hidden: false,
        meta_always_show: false,
        meta_affix: false
    },
    {
        id: 2010,
        parent_id: '2000',
        path: 'index',
        name: 'OrganizationIndex',
        type: true,
        permission: 'org_index',
        component: '/organization/index',
        redirect: null,
        meta_sort: 2010,
        meta_title: '组织列表',
        meta_icon: null,
        meta_keep_alive: false,
        meta_hidden: false,
        meta_always_show: false,
        meta_affix: false
    },
    {
        id: 2020,
        parent_id: '2000',
        path: 'add',
        name: 'OrganizationAdd',
        type: true,
        permission: 'org_add',
        component: '/organization/add',
        redirect: null,
        meta_sort: 2020,
        meta_title: '新增组织',
        meta_icon: null,
        meta_keep_alive: false,
        meta_hidden: false,
        meta_always_show: false,
        meta_affix: false
    },
    {
        id: 2030,
        parent_id: '2000',
        path: 'edit',
        name: 'OrganizationEdit',
        type: true,
        permission: 'org_edit',
        component: '/organization/edit',
        redirect: null,
        meta_sort: 2030,
        meta_title: '编辑组织',
        meta_icon: null,
        meta_keep_alive: false,
        meta_hidden: false,
        meta_always_show: false,
        meta_affix: false
    },
    {
        id: 3000,
        parent_id: '-1',
        path: '/tree',
        name: 'Tree',
        type: false,
        permission: null,
        component: 'LAYOUT',
        redirect: null,
        meta_sort: 3000,
        meta_title: '组织树',
        meta_icon: 'Tree',
        meta_keep_alive: false,
        meta_hidden: false,
        meta_always_show: false,
        meta_affix: false
    },
    {
        id: 4000,
        parent_id: '-1',
        path: 'https://github.com/',
        name: 'GitHub',
        type: false,
        permission: null,
        component: 'LAYOUT',
        redirect: null,
        meta_sort: 4000,
        meta_title: 'Github',
        meta_icon: 'Github',
        meta_keep_alive: false,
        meta_hidden: false,
        meta_always_show: false,
        meta_affix: false
    }
]

export default [
    {
        url: '/admin/menus',
        method: 'get',
        response: () => {
            return {
                code: 0,
                data: menus,
                msg: 'ok'
            }
        }
    }
] as MockMethod[]