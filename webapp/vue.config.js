const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('./package.json'));
module.exports = {
    configureWebpack: config => {
        config.output.filename = packageJson.version + '.[name].js';

    },
    chainWebpack: config => {
        config.plugin('extract-css')
            .tap(([options, ...args]) => [
                Object.assign({}, options, { filename: 'css/' + packageJson.version + '.[name].css' }),
                ...args
            ])
    },
    pwa: {
        name: 'StudentFridge',
        themeColor: '#000000',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        workboxOptions: {
            skipWaiting: true
        },
        workboxPluginMode: 'GenerateSW'
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                ws: true,
                changeOrigin: true
            },
            '/auth': {
                target: 'http://localhost:4000',
                ws: true,
                changeOrigin: true
            },
            '/static-files': {
                target: 'http://localhost:4000',
                ws: true,
                changeOrigin: true
            }
        }
    }
};