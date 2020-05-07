const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(createProxyMiddleware('/api', {
        target: 'https://www.dhms.net',
        changeOrigin: true,
    }))
    app.use(createProxyMiddleware('/oss', {
        target: 'https://www.dhms.net',
        changeOrigin: true
    }))
};
