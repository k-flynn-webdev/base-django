process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_NAME = require('./package.json').name

module.exports = {
  devServer: {
    proxy: {
      '/admin': {
        target: 'http://127.0.0.1:8400/',
        ws: false,
      },
      '/api/': {
        target: 'http://127.0.0.1:8400/',
        ws: false,
      },
      '/rest-auth/': {
        target: 'http://127.0.0.1:8400/',
        ws: false,
      }
      // '/login': {
      //   target: 'http://127.0.0.1:8000/',
      //   ws: false,
      // },
    }
  },
  // outputDir must be added to Django's TEMPLATE_DIRS
  outputDir: './dist/',
  // assetsDir must match Django's STATIC_URL
  assetsDir: 'static',
}

