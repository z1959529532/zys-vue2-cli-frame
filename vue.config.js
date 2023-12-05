const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        host: 'localhost',
        // "serve": "vue-cli-service serve --open",
        // open: true,  // 自动启动浏览器
        port: 8054,  // 端口
        // 代理请求地址，解决跨域
        proxy: {
            '/zysDevApi': {
                target: 'http://localhost:3001',
                changeOrigin: true,
                // pathRewrite作用是把实际地址+给定值http://localhost:3000/abc
                // 一般为空
                pathRewrite: {
                    '^/zysDevApi': ''
                }
            }
        }
    },
    lintOnSave: false,  //关闭eslint
    // parallel: true,
    // outputDir: './dist/zys-frame-vue',
    // css: {                  // 引入全局less配置
    //     loaderOptions: {
    //         less: {
    //             globalVars: {
    //                 hack: `true; @import '~@/assets/css/global.less';`
    //             },
    //             javascriptEnabled: true
    //         }
    //     }
    // },

    configureWebpack: require('./webpack.config')
})
