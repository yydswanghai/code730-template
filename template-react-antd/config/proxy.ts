/**
 * @name 代理的配置
 */
export default {
    dev: {
        // localhost:8808/v2/api/** -> https://preview.pro.ant.design/v2/api/**
        '/v2/api/': {
            target: 'https://preview.pro.ant.design/',
            changeOrigin: true,
            pathRewrite: { '^': '' },
        }
    },
    test: {
        '/api/': {
            target: 'your pre url',
            changeOrigin: true,
            pathRewrite: { '^': '' },
        }
    }
}