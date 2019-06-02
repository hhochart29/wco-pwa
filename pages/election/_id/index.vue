<template>
  <div class="wcocontainer">
    <div v-if="delegate && Object.keys(delegate).length">
      <h1>{{ delegate.name }} {{ delegate.firstname }}</h1>

      <img
        :src="delegate.avatar.url"
        :alt="delegate.avatar.alt"
        class="shadow rounded-full m-auto my-3"
      >

      <div class="flex justify-center my-3 flex-wrap">
        <div class="mr-3 flex justify-center items-center mr-5">
          <img :src="age" class="w-6 mr-3">
          <b>{{ delegate.age }} ans</b>
        </div>
        <div class="mr-3 flex justify-center items-center">
          <img :src="vote" class="w-8 mr-3">
          <b>{{ delegate.totalvote }} citoyens représentés</b>
        </div>
        <div>
          Représentant depuis le
          <b>{{ since }}</b>
        </div>
        <div>
          <b>{{ delegate.job }}</b>
        </div>
      </div>

      <div class="p-5 my-5 text-justify bg-grey-light italic">{{ delegate.description }}</div>

      <h3 class="text-xl font-bold text-center pb-4">Derniers votes</h3>
      <div
        v-for="({ weather }, index) in delegate.weathervotes"
        :key="`${weather.title}-${index}`"
        class="mb-5 border-indigo border rounded-sm"
      >
        <div class="flex items-center justify-between p-2 bg-indigo text-indigo-lightest">
          <h3 class="font-bold text-center">{{ weather.title }}</h3>
          <div class="w-12 h-12 px-2 bg-grey-lighter rounded-full flex items-center">
            <img :src="weather.image.url" :alt="weather.image.alt" >
          </div>
        </div>
        <div class="px-2 pt-2">{{ weather.description }}</div>
        <div class="px-2 pb-2 text-sm italic">{{ weatherTimer(index) }}</div>
      </div>
    </div>
    <info v-else>Le délégué avec l'id {{ $route.params.id }} n'existe pas</info>
  </div>
</template>

<script>
import { delegateById } from '@/graphql/query'
import info from '@/components/info'
import user from '@/assets/images/user.svg'
import vote from '@/assets/images/vote.svg'

export default {
  name: 'ArticleId',
  components: {
    info
  },
  data: () => ({
    age: user,
    vote
  }),
  async asyncData ({ app, params }) {
    let client = app.apolloProvider.defaultClient
    let { data } = await client.query({ query: delegateById, variables: { id: params.id } })
    if (app.$delay) {
      await app.$delay(600)
    }

    return data
  },
  created () {
    this.$route.params.id = !this.$route.params.id ? 1 : this.$route.params.id
  },
  computed: {
    weatherTimer () {
      return (index) => {
        switch (index) {
          case 0: return 'Hier'
          case 1: return 'Il y a 2 jours'
          case 2: return 'Il y a 3 jours'
          case 3: return 'Il y a 4 jours'
          case 4: return 'Il y a 5 jours'
          case 5: return 'Il y a 6 jours'
          case 6: return 'Il y a une semaine'
        }
      }
    },
    since () {
      return this.$dayjs && this.$dayjs(this.delegate.since).format('D MMM YYYY')
    }
  }
}
</script>
