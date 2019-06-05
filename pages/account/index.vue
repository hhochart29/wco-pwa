<template>
  <div class="wcocontainer">
    <h1>Votre compte</h1>
    <div class="text-left" v-if="currentDelegate">
      <div class="my-3 flex flex-col items-center">
        <b>{{ currentDelegate.name }} - {{ currentDelegate.firstname }}, {{ currentDelegate.age }} ans</b> vous représente
        <img :src="currentDelegate.avatar.url" class="rounded-full my-3">
        <nuxt-link
          :to="{name: 'election-id', params: { id: currentDelegate.id } }"
          class="bg-indigo text-grey-lighter rounded-full px-4 py-2"
        >Consultez son profil</nuxt-link>
      </div>
    </div>
    <info v-else class="my-5">
      Vous n'avez aucun representant pour le moment. Rendez vous sur la
      <nuxt-link :to="{name: 'election'}" class="underline font-bold">page des représentants</nuxt-link> pour en choisir un.
    </info>

    <div class="text-left" v-if="currentVote && currentVote.id">
      <div class="my-3 flex flex-col items-center">
        Votre vote :
        <b>{{ currentVote.title }}</b>
        <img :src="currentVote.image.url" class="rounded-full my-4 w-32 h-32 shadow-lg p-2">
        <nuxt-link
          :to="{name: 'index' }"
          class="bg-indigo text-grey-lighter rounded-full px-4 py-2"
        >Changer de vote</nuxt-link>
      </div>
    </div>
    <info v-else>
      Vous n'avez fait aucun vote pour moment. Rendez vous sur
      <nuxt-link :to="{name: 'index'}" class="underline font-bold">la carte</nuxt-link> pour voter
    </info>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import info from '@/components/info'

export default {
  name: 'account',
  async asyncData ({ app }) {
    if (app.$delay) {
      await app.$delay(600)
    }
  },
  components: {
    info
  },
  data: () => ({
    delegateProfile: null
  }),
  computed: {
    ...mapGetters({
      currentDelegate: 'delegate/currentDelegate',
      currentVote: 'vote/currentVote'
    })
  }
}
</script>
