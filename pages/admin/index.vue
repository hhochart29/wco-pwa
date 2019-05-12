<template>
  <div class="wcocontainer">
    <button @click="sendNotif">Send Notif</button>
  </div>
</template>

<script>
export default {
  name: 'admin',
  methods: {
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
