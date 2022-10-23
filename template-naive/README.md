## naive-ui vue3 + ts 中后台模版

1. 路由配置说明：

```ts
{
    path: '/dashboard',           // 根路由都是以'/'开头，子路由不要再以'/'开头 (必填)
    name: 'Dashboard',            // 路由name (必填)
    component: 'Layout',          // 根组件都以`Layout`组件为主
    redirect: '/dashboard/index', // 建议根路由重定向到子路由 (非必填)
    meta: {// (必填)
        title: '控制台',              // 名称 (必填)
        icon: renderIcon(Dashboard), // 图标 (非必填，子组件可以为null)
        sort: 1,                     // 排序 (非必填，可以省略)
        hidden: false,               // 是否在菜单栏中隐藏 (非必填，可以省略)
        alwaysShow: false,           // 它就会忽略之前定义的规则，一直显示根路由 (非必填，可以省略)
        keepAlive: false,            // 是否缓存 (非必填，可以省略)
        affix: false,                // 是否固定标签 (非必填，可以省略)
    },
    children: [// 如果不是通过接口请求到的路由，你必须给一个用于显示的子路由，因为根路由仅用来显示Layout组件
        {
            path: 'index',
            name: 'DashboardIndex',
            component: () => import('@/views/menus/dashboard/index.vue'),
            meta: { title: '控制台' },
        }
    ]
}
```

> `所有的菜单栏目统一放在views/menus目录下`

2. 主题色：文件修改在`styles/var.scss`，更多UI库组件配置在`App.vue => themeOverrides`

3. icon组件的使用：详情：https://www.npmjs.com/package/vite-svg-loader

注意：`icons`目录下生成组件，并统一导出时命名都是大驼峰式命名法（首字母也要大写）
后台接口请求到的`icon`实际是一个字符串，转换为组件后也要跟这个命名保持一致才会正确加载。
所以接口请求到的`icon`统一使用的是`icons`目录下的组件

- 如果你仅需要作为图片使用，请在路经后加`?url`

```html
<img src="~@/assets/avatar-1.svg?url"/>
```

- 如果你是作为组件使用，请在路经后加`?component`

```html
<template>
    <n-icon><AsideLogo /></n-icon>
</template>

<script lang="ts" setup>
import AsideLogo from "@/assets/logo-2.svg?component"
</script>
```

4. vue-router4 动态添加路由，刷新页面警告处理，详情：https://juejin.cn/post/7145364447349964808

## npm检查与更新

需要依赖 npm-check-updates

1. 检查可更新的模块

```shell
ncu
```

2. 更新package.json的依赖包到最新版本

```shell
ncu -u
```

3. 更新pageage.json后，可删除整个node_modules目录，然后重新初始化项目

```shell
npm i
```