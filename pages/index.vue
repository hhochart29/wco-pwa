<template>
  <div class="flex overflow-hidden" :style="style" @touchStart="touchStart" @touchEnd="touchEnd" @touchMove="touchMove">
    <Map class="container-full bg-indigo-lightest flex-basis-100 flex-no-shrink" />
    <News class="container-full bg-indigo-lightest flex-basis-100 flex-no-shrink" />
    <Delegation class="container-full bg-indigo-lightest flex-basis-100 flex-no-shrink" />
  </div>
</template>

<script>
import Map from '@/components/map'
import News from '@/components/news'
import Delegation from '@/components/delegation'

import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    Map,
    News,
    Delegation
  },
  computed: {
    style () {
      return {
        height: `calc(100vh - ${this.getStoreHeaderHeight()}px`
      }
    }
  },
  methods: {
    ...mapGetters({
      getStoreHeaderHeight: 'header/height'
    }),
    touchStart () {
      console.log('touchStart')
    },
    touchMove () {
      console.log('touchMove')
    },
    touchEnd () {
      console.log('touchEnd')
    }
  }
}
</script>

<style lang="postcss">
  .container-full {
    @apply px-5;
    @apply py-5;
  }

  .flex-basis-100 {
    flex-basis: 100%;
  }
</style>
