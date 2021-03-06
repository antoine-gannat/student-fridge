module.exports = {
    pwa: {
        name: 'StudentFridge',
        themeColor: '#000000',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black'
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