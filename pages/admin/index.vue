<template>
  <div class="wcocontainer">
    <button @click="sendNotif1" class="block p-5 bg-indigo text-white mt-5">Vote dispo</button>
    <button
      @click="sendNotif2"
      class="block p-5 bg-indigo text-white mt-5"
    >Agriculture nantaise secheresse</button>
    <button @click="sendNotif3" class="block p-5 bg-indigo text-white mt-5">Representant</button>
  </div>
</template>

<script>
export default {
  name: 'admin',
  data: () => ({
    options: {
      host: 'onesignal.com',
      port: 443,
      path: '/api/v1/notifications',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Basic ${process.env.nuxt_signal_rest_api}`
      }
    }

  }),
  methods: {
    sendNotif1 () {
      this.sendNotif('Votre vote est disponible !', 'https://wco-pwa.netlify.com')
    },
    sendNotif2 () {
      this.sendNotif('L\'agriculture Nantaise au bord de la sécheresse', 'https://wco-pwa.netlify.com/article/1081315')
    },
    sendNotif3 () {
      this.sendNotif('Vous pouvez choisir un représentant !', 'https://wco-pwa.netlify.com/election')
    },
    sendNotif (title, url) {
      let message = {
        app_id: process.env.nuxt_signal_app_id,
        contents: { 'en': title },
        url,
        included_segments: ['All']
      }

      let https = require('https')
      let req = https.request(this.options, res => {
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
