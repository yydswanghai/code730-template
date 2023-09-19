* umi官网：https://umijs.org/docs/api/api#history
* antd官网：https://ant-design.antgroup.com/components/breadcrumb-cn

> umi lint

```sh
umi lint [glob] [--fix] [--eslint-only] [--stylelint-only] [--cssinjs]
```

参数说明

[glob]: 可选，指定要 lint 的文件，默认为 `{src,test}/**/*.{js,jsx,ts,tsx,css,less}`
  --quiet: 可选，禁用 `warn` 规则的报告，仅输出 `error`
  --fix: 可选，自动修复 lint 错误
  --eslint-only: 可选，仅执行 ESLint
  --stylelint-only: 可选，仅执行 Stylelint
  --cssinjs: 可选，为 Stylelint 启用 CSS-in-JS 支持