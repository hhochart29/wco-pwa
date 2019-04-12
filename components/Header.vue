<template>
  <header class="bg-indigo-darkest text-indigo-lightest px-2 py-1 flex justify-between">
    <div class="flex" ref="tabs">
      <nuxt-link :to="{name: tab.route}" :key="`${tab.name}-${index}`" class="tab p-1 flex items-center cursor-pointer" v-for="(tab, index) in tabs">
        <span class="active-bg" v-if="index === 0"></span>
        <img class="rounded-full md:w-8 m-1ohH" :src="tab.image" :alt="tab.name">
      </nuxt-link>
    </div>

    <div class="flex items-center">
      <div class="mr-2 md:text-xs" @click="sendNotif">
        Send notif
      </div>
      <div class="mr-2 md:text-xs">
        Mr. Moussard
      </div>
      <div class="flex items-center">
        <img class="rounded-full md:w-8" src="https://via.placeholder.com/50x50">
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Header',
  data: () => ({
    tabs: [
      { name: 'Carte', route: 'index', image: 'https://via.placeholder.com/50x50' },
      { name: 'Articles', route: 'article', image: 'https://via.placeholder.com/50x50' },
      { name: 'Délégué', route: 'delegation', image: 'https://via.placeholder.com/50x50' }
    ]
  }),
  methods: {
    ...mapActions({
      setHeaderTab: 'header/tabs'
    }),
    sendNotif () {
      let message = {
        app_id: process.env.nuxt_signal_app_id,
        contents: { 'en': 'Notifcation from rest API' },
        included_segments: ['All']
      }
      let options = {
        host: 'onesignal.com',
        port: 443,
        path: '/api/v1/notifications',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Basic ${process.env.nuxt_signal_rest_api}`
        }
      }

      let https = require('https')
      let req = https.request(options, res => {
        res.on('data', data => {
          console.log('Response:')
          console.log(JSON.parse(data))
        })
      })

      req.on('error', e => {
        console.log('ERROR:')
        console.log(e)
      })

      req.write(JSON.stringify(message))
      req.end()
    }
  },
  mounted () {
    let tabNb = this.$refs.tabs.children.length
    this.setHeaderTab(tabNb)
  }
}
</script>

<style lang="postcss" scoped>
  div.tab {
    position: relative;

    & img {
      z-index: 1;
      position: relative;
    }

    & .active-bg {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 0;
      @apply bg-indigo-dark;
      transition: transform 0.4s ease-in-out;
    }
  }
</style>
