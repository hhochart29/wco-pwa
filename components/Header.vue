<template>
  <div class="bg-indigo-darkest text-indigo-lightest px-2 py-1 flex justify-between">
    <div class="flex" ref="tabs">
      <div :key="`tab.name-${index}`" @click="setHeaderIndex(index)" class="tab p-1 flex items-center" :class="{active: getStoreHeaderIndex === index}" v-for="(tab, index) in tabs">
        <span class="active-bg" :style="activeBgStyle" v-if="index === 0"></span>
        <img class="rounded-full md:w-8 m-1ohH" :src="tab.image" :alt="tab.name">
      </div>
    </div>

    <div class="flex items-center">
      <div class="mr-2 md:text-xs">
        Mr. Moussard
      </div>
      <div class="flex items-center">
        <img class="rounded-full md:w-8" src="https://via.placeholder.com/50x50">
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Header',
  data: () => ({
    tabs: [
      { name: 'Carte', image: 'https://via.placeholder.com/50x50' },
      { name: 'Articles', image: 'https://via.placeholder.com/50x50' },
      { name: 'Délégué', image: 'https://via.placeholder.com/50x50' }
    ]
  }),
  computed: {
    ...mapGetters({
      getStoreHeaderIndex: 'header/index'
    }),
    activeBgStyle () {
      return {
        transform: `translateX(calc(100 * ${this.getStoreHeaderIndex}%))`
      }
    }
  },
  methods: {
    ...mapActions({
      setHeaderTab: 'header/tabs',
      setHeaderIndex: 'header/index'
    })
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
