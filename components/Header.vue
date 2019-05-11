<template>
  <header class="bg-white text-indigo-lightest px-2 py-1">
    <div class="flex items-center justify-between" ref="tabs">
      <nuxt-link
        :to="{name: tab.route}"
        :key="`${tab.name}-${index}`"
        class="tab"
        v-for="(tab, index) in tabs"
      >
        <img class="w-5" :src="tab.image" :alt="tab.name">
      </nuxt-link>

      <nuxt-link tag="div" to="/" class="flex-grow justify-center px-1 text-center">
        <img class="h-6" :src="logo" alt="Weather Control Organization Logo">
      </nuxt-link>

      <div class="mr-2 md:text-xs text-indigo-darkest" @click="sendNotif">Send notif</div>
      <div class="mr-2 md:text-xs text-indigo-darkest">Mr. Moussard</div>
      <nuxt-link :to="{name: 'account'}" class="tab">
        <img class="w-5" :src="userImage" alt="Mon compte">
      </nuxt-link>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex'
import map from '@/assets/images/map.svg'
import news from '@/assets/images/news.svg'
import vote from '@/assets/images/vote.svg'
import user from '@/assets/images/user.svg'
import logo from '@/assets/images/wco.png'

export default {
  name: 'Header',
  data: () => ({
    tabs: [
      { name: 'Carte', route: 'index', image: map },
      { name: 'Articles', route: 'article', image: news },
      { name: 'Délégué', route: 'delegation', image: vote }
    ],
    userImage: user,
    logo
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
  }
}
</script>

<style lang="postcss" scoped>
.tab {
  position: relative;
  @apply p-2 m-1 flex items-center cursor-pointer bg-indigo-darkest rounded-full;

  &.nuxt-link-exact-active:not(div) {
    border-bottom: 2px solid config('colors.white');
  }

  & img {
    z-index: 1;
    position: relative;

    & path {
      fill: white;
    }
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
