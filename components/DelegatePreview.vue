<template>
  <article class="card rounded-sm overflow-hidden shadow-lg flex-grow my-5">
    <div class="flex items-center p-4 flex-wrap">
      <img :src="avatar.url" alt="avatar.alt" class="rounded-full shadow w-24 h-24 mr-3" :class="{ 'border-4 border-green': currentDelegate && id === currentDelegate.id }">
      <div class="avatar-desc">
        <div class="font-bold text-xl text-indigo">{{ name }} {{ firstname }}</div>
        <p class="text-grey-darker text-base">{{ age }} ans</p>
      </div>
    </div>
    <transition appear name="slide">
      <div v-if="currentDelegate && id === currentDelegate.id" class="bg-grey-light text-grey-darker m-auto py-1 px-2">
        <tick class="inline-block w-6 mr-4" />
        <span>Vous représente</span>
      </div>
    </transition>
    <div class="flex flex-wrap justify-between p-4">
      <ul class="text-grey-darker text-base mb-3">
        <li><img :src="user" class="w-6 inline-block mr-4" /><b>{{ totalvote }}</b> citoyens représentés</li>
        <li class="my-2"><img :src="work" class="w-6 inline-block mr-4" />{{ job }}</li>
        <li><img :src="vote" class="w-6 inline-block mr-4" />Délégué depuis <b>{{ new Date(since).getFullYear() }}</b>
        </li>
      </ul>
      <nuxt-link tag="button" :to="{name: 'election-id', params: { id: id } }" class="rounded-full  bg-indigo text-grey-lighter cursor-pointer py-2 px-4 mt-2 w-full">Détails</nuxt-link>
    </div>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'
import user from '@/assets/images/user.svg'
import vote from '@/assets/images/vote.svg'
import work from '@/assets/images/work.svg'
import tick from '@/components/svg/tick'

export default {
  props: {
    id: String,
    name: String,
    firstname: String,
    age: Number,
    avatar: Object,
    job: String,
    since: String,
    totalvote: Number
  },
  data: () => ({
    user,
    vote,
    work
  }),
  components: {
    tick
  },
  computed: {
    ...mapGetters({
      currentDelegate: 'delegate/currentDelegate'
    })
  }
}
</script>
