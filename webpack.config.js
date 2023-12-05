const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

function resolve(dir) {
    // return path.join(__dirname, dir);
    return path.resolve(__dirname, dir);
}

module.exports = {
    // 开启缓存
    cache: true,
    // yarn add rimraf -D 自动清除.cache文件
    // "clean": "rimraf node_modules/.cache"
    // yarn add thread-loader -D
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve('src'),
                use: [
                    'thread-loader',
                    'babel-loader'
                ]
            }
        ]
    },

    // 不显示文件过大优化建议
    performance: {
        hints: false
    },
    resolve: {
        alias: {
            '@': resolve('src'),
            '@views': resolve('src/views'),
            '@assets': resolve('src/assets'),
        },
        extensions: ['.ts', '.js']
    },
    plugins: [new NodePolyfillPlugin()]
};
