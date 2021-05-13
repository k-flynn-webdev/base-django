process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_NAME = require('./package.json').name

module.exports = {
  devServer: {
    proxy: {
      '^/static': {
        // target: process.env.API_ADDRESS,
        target: 'http://127.0.0.1:8700',
        changeOrigin: true,
        ws: false,
      },
      '^/admin': {
        // target: process.env.API_ADDRESS,
        target: 'http://127.0.0.1:8700',
        changeOrigin: true,
        ws: false,
      },
      '^/accounts': {
        // target: process.env.ACCOUNTS_ADDRESS,
        target: 'http://127.0.0.1:8700',
        changeOrigin: true,
        ws: false,
      },
      '^/api': {
        // target: process.env.API_ADDRESS,
        target: 'http://127.0.0.1:8700',
        changeOrigin: true,
        ws: false,
      },
    }
  },
  // outputDir must be added to Django's TEMPLATE_DIRS
  outputDir: './dist/',
  // assetsDir must match Django's STATIC_URL
  assetsDir: 'static',
}
