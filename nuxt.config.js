const pkg = require('./package')
require('dotenv').config()

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  env: {
    nuxt_signal_app_id: process.env.ONE_SIGNAL_APP_ID,
    nuxt_signal_rest_api: process.env.ONE_SIGNAL_REST_API,
    mapbox_token: process.env.MAPBOX_TOKEN
  },

  loading: '~/components/loading.vue',

  /*
  ** Global CSS
  */
  css: ['~/assets/css/tailwind.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vue2-touch-events'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ['@nuxtjs/onesignal'],
    ['@nuxtjs/pwa'],
    ['@nuxtjs/apollo', {
      clientConfigs: {
        default: '~/plugins/apollo-config.js'
      }
    }]
  ],

  oneSignal: {
    init: {
      appId: process.env.ONE_SIGNAL_APP_ID,
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
        disable: false
      }
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
