require('dotenv-expand')(require('dotenv').config({ path: `../.env` }))

process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_NAME = process.env.APP_NAME_FULL

module.exports = {
  devServer: {
    proxy: {
      '^/static': {
        target: process.env.API_ADDRESS || 'http://127.0.0.1:8700',
        changeOrigin: true,
        ws: false,
      },
      '^/admin': {
        target: process.env.API_ADDRESS || 'http://127.0.0.1:8700',
        changeOrigin: true,
        ws: false,
      },
      '^/accounts': {
        target: process.env.API_ADDRESS || 'http://127.0.0.1:8700',
        changeOrigin: true,
        ws: false,
      },
      '^/api': {
        target: process.env.API_ADDRESS || 'http://127.0.0.1:8700',
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
