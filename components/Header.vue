<template>
  <header class="bg-indigo text-indigo-lightest px-2 py-1">
    <div class="flex items-center justify-between" ref="tabs">
      <nuxt-link :to="{name: 'index'}" class="tab">
        <img class="w-5" :src="mapImage" alt="Carte">
      </nuxt-link>

      <nuxt-link :to="{name: 'article'}" class="tab">
        <img class="w-5" :src="newsImage" alt="Actualités">
      </nuxt-link>

      <nuxt-link
        tag="div"
        :to="{name: 'index'}"
        class="flex-grow text-3xl justify-center px-1 text-center font-mono"
      >WCO</nuxt-link>

      <nuxt-link :to="{name: 'election'}" class="tab">
        <img class="w-5" :src="delegateImage" alt="Délégué">
      </nuxt-link>

      <nuxt-link :to="{name: 'account'}" class="tab">
        <img class="w-5" :src="userImage" alt="Mon compte">
      </nuxt-link>
    </div>
  </header>
</template>

<script>
import map from '@/assets/images/map.svg'
import news from '@/assets/images/news.svg'
import vote from '@/assets/images/vote.svg'
import user from '@/assets/images/user.svg'

export default {
  name: 'Header',
  data: () => ({
    mapImage: map,
    newsImage: news,
    userImage: user,
    delegateImage: vote
  })
}
</script>

<style lang="postcss" scoped>
.tab {
  position: relative;
  @apply p-2 m-1 flex items-center cursor-pointer bg-grey-lighter rounded-full;
  &.nuxt-link-exact-active::after {
    content: '';
    @apply absolute rounded-full;
    top: 2px;
    bottom: 2px;
    right: 2px;
    left: 2px;
    border: 2px solid theme('colors.indigo');
  }
}
</style>
