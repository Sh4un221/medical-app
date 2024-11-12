module.exports = {
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    devServer: {
      watchOptions: {
        ignored: [
          /node_modules/,
          /DumpStack\.log\.tmp/,
          /hiberfil\.sys/,
          /pagefile\.sys/,
          /swapfile\.sys/
        ]
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
      },
    },
  }
};