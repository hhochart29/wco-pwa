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
        <div class="flex justify-center items-center mr-5 w-full">
          <img :src="age" class="w-6 mr-3">
          <b>{{ delegate.age }} ans</b>
        </div>
        <div class="flex items-center">
          <img :src="vote" class="w-8 mr-3">
          <b>{{ delegate.totalvote }} citoyens représentés</b>
        </div>
        <div class="my-1">
          Représentant depuis le
          <b>{{ since }}</b>
        </div>
        <div class="flex items-center">
          <img :src="work" class="w-8 mr-3">
          {{ delegate.job }}
        </div>
      </div>

      <div class="p-5 my-5 text-justify bg-grey-light italic rounded">{{ delegate.description }}</div>

      <transition appear mode="out-in" name="slide">
        <div v-if="isCurrentDelegate" class="text-grey-lighter flex justify-center flex-wrap">

          <div class="bg-grey-light text-grey-darker m-auto py-1 px-2 w-full text-center">
            <tick class="inline-block w-6 mr-4" />
            <span>Vous représente</span>
          </div>
          <button class="bg-red py-2 px-4 rounded-full my-2" @click="setCurrentDelegateStore(null)">Récupérer votre vote</button>
        </div>
        <button
          class="text-grey-lighter bg-indigo px-4 py-2 rounded-full mb-4 m-auto cursor-pointer block"
          @click="setDelegate"
          v-else
        >Choisir comme représentant
        </button>
      </transition>

      <div v-if="delegate.weathervotes.length > 0">
        <h3 class="text-xl font-bold text-center pb-4">Derniers votes</h3>
        <div
          v-for="({ weather }, index) in delegate.weathervotes"
          :key="`${weather.title}-${index}`"
          class="mb-5 shadow rounded-sm"
        >
          <div class="flex items-center justify-between p-2 bg-indigo text-indigo-lightest">
            <h3 class="font-bold text-center">{{ weather.title }}</h3>
            <div class="w-12 h-12 px-2 bg-grey-lighter rounded-full flex items-center">
              <img :src="weather.image.url" :alt="weather.image.alt">
            </div>
          </div>
          <div class="px-2 pt-2">{{ weather.description }}</div>
          <div class="px-2 pb-2 text-sm italic">{{ weatherTimer(index) }}</div>
        </div>
      </div>
      <h3 v-else class="text-xl font-bold text-center pb-4">Aucun derniers votes</h3>
    </div>
    <info v-else>Le délégué avec l'id {{ $route.params.id }} n'existe pas</info>
  </div>
</template>

<script>
import { delegateById } from '@/graphql/query'
import { mapActions, mapGetters } from 'vuex'

import info from '@/components/info'
import user from '@/assets/images/user.svg'
import vote from '@/assets/images/vote.svg'
import work from '@/assets/images/work.svg'
import tick from '@/components/svg/tick'

export default {
  name: 'ArticleId',
  components: {
    info,
    tick
  },
  data: () => ({
    age: user,
    vote,
    work
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
    ...mapGetters({
      currentDelegate: 'delegate/currentDelegate'
    }),
    weatherTimer () {
      return (index) => {
        switch (index) {
          case 0:
            return 'Hier'
          case 1:
            return 'Il y a 2 jours'
          case 2:
            return 'Il y a 3 jours'
          case 3:
            return 'Il y a 4 jours'
          case 4:
            return 'Il y a 5 jours'
          case 5:
            return 'Il y a 6 jours'
          case 6:
            return 'Il y a une semaine'
        }
      }
    },
    isCurrentDelegate () {
      return this.currentDelegate && this.currentDelegate.id === this.delegate.id
    },
    since () {
      return this.$dayjs && this.$dayjs(this.delegate.since).format('D MMM YYYY')
    }
  },
  methods: {
    ...mapActions({
      setCurrentDelegateStore: 'delegate/setCurrentDelegate'
    }),
    setDelegate () {
      this.setCurrentDelegateStore(this.delegate.id)
    }
  }
}
</script>
