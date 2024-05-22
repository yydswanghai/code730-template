## element-plus vue3 + ts 中后台模版

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

2. 主题色：组件库颜色被`styles/element/index.scss`重置，颜色变量在`var.scss`，暗主题色一样

> 颜色配置修改

使用`scss`变量替换了`element-plus/theme-chalk/src/common/var.scss`的主题色

直接修改`styles/var.scss`的对应变量即可

暗色模式只替换了`primary`其他需要的自行添加即可

* `styles/var.scss`在vite配置 css.preprocessorOptions.scss.additionalData 全局注入，以后在组件中可以直接使用它全部的变量，无需再导入

3. icon组件的使用：

注意：`icons`目录下生成组件，并统一导出时命名都是大驼峰式命名法（首字母也要大写）
后台接口请求到的`icon`实际是一个字符串，转换为组件后也要跟这个命名保持一致才会正确加载。
所以接口请求到的`icon`统一使用的是`icons`目录下的组件

详情：https://www.npmjs.com/package/vite-svg-loader

- 如果你仅需要作为图片使用，请在路经后加`?url`

```html
<img src="~@/assets/avatar-1.svg?url"/>
```

- 如果你是作为组件使用，请在路经后加`?component`

```html
<template>
    <el-icon><AsideLogo /></el-icon>
</template>

<script lang="ts" setup>
import AsideLogo from "@/assets/logo-2.svg?component"
</script>
```

4. 关于在src目录下使用node的`path`模块，因为vite源码中设定了不允许在客户端代码中访问内置模块代码。
所以这里使用一个实现了`path`模块的`path-browserify`

```sh
npm i path-browserify
npm install --save @types/path-browserify
```

5. vue-router4 动态添加路由，刷新页面警告处理，详情：https://juejin.cn/post/7145364447349964808

## 常见问题处理

6. optimizeDeps.force：设置为 true 可以强制依赖预构建，而忽略之前已经缓存过的、已经优化过的依赖。

7. 打包构建时候警告：

```shell
<stdin>:1:16
    @charset "UTF-8"
```

可以在vite.config.ts设置忽略该提示

```js
css: {
    preprocessorOptions: {
        scss: {
            charset: false
        }
    }
}
```

8. 关于插件 vite-svg-loader 升级可能有依赖报错的问题，一般不需要对它进行升级

