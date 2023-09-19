import { defineConfig } from "umi";
import routes from "./routes/index";
import proxy from "./proxy";

const { NODE_ENV, REACT_APP_ENV, UMI_ENV } = process.env;

console.log(
    "NODE_ENV: ",
    NODE_ENV,
    "UMI_ENV: ",
    UMI_ENV,
    "REACT_APP_ENV: ",
    REACT_APP_ENV
);

export default defineConfig({
    npmClient: "yarn",
    base: "/",
    /**
     * @name 添加hash
     * @description 让build之后的添加hash后缀，用于增量发布，避免缓存
     * @doc https://umijs.org/docs/api/config#hash
     */
    hash: true,
    /**
     * @name 路由配置
     * @doc https://umijs.org/docs/guides/routes
     */
    routes,
    /**
     * @name 代理配置
     * @doc 代理介绍 https://umijs.org/docs/guides/proxy
     * @doc 代理配置 https://umijs.org/docs/api/config#proxy
     */
    proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
    plugins: ["@umijs/plugins/dist/dva"],
    dva: {},
    icons: {},
});
