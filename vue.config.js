// vue.config.js

module.exports = {
    productionSourceMap: false,
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        // 代理需保证路径真实可用
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/testApi': {
                target: 'http://localhost:8080',
                ws: true,
                changOrigin: true
            }
        }
    }
}
