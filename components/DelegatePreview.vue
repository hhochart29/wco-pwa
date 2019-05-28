<template>
  <article class="card rounded-sm overflow-hidden shadow-lg flex-grow my-5">
    <div class="flex items-center p-4">
      <img :src="avatar.url" alt="avatar.alt" class="rounded-full shadow w-24 h-24 mr-3" :class="{ 'border-4 border-green': id === currentDelegate }">
      <div class="avatar-desc">
        <div class="font-bold text-xl text-indigo">{{ name }} {{ firstname }}</div>
        <p class="text-grey-darker text-base">{{ age }} ans</p>
      </div>
    </div>
    <div class="flex flex-wrap justify-between p-4">
      <ul class="text-grey-darker text-base">
        <li>{{ job }}</li>
        <li><b>{{ totalvote   }}</b> citoyen représentés</li>
        <li>Délégué depuis <b>{{ new Date(since).getFullYear() }}</b></li>
      </ul>
      <nuxt-link tag="button" :to="{name: 'election-id', params: { id: id } }" class="rounded-full  bg-indigo text-grey-lighter cursor-pointer py-2 px-4 mt-2 w-full">Détails</nuxt-link>
    </div>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters({
      currentDelegate: 'delegate/currentDelegate'
    })
  }
}
</script>
