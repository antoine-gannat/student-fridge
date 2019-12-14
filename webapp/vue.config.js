module.exports = {
    pwa: {
        name: 'SolidaryFridge',
        themeColor: '#FFFFFF',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        workboxPluginMode: 'GenerateSW'
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                ws: true,
                changeOrigin: true
            },
            '/data': {
                target: 'http://localhost:4000',
                ws: true,
                changeOrigin: true
            }
        }
    }
};