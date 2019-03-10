<template xmlns:v-touch="http://www.w3.org/1999/xhtml">
  <div :style="style" class="flex overflow-hidden" id="slider" ref="slider" v-touch:swipe="swipe">
    <Map class="container-full bg-indigo-lightest flex-basis-100 flex-no-shrink" />
    <News class="container-full bg-indigo-lightest flex-basis-100 flex-no-shrink" />
    <Delegation class="container-full bg-indigo-lightest flex-basis-100 flex-no-shrink" />
  </div>
</template>

<script>
import Map from '@/components/map'
import News from '@/components/news'
import Delegation from '@/components/delegation'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    Map,
    News,
    Delegation
  },
  computed: {
    ...mapGetters({
      getStoreHeaderHeight: 'header/height',
      getStoreHeaderIndex: 'header/index'
    }),
    style () {
      return {
        height: `calc(100vh - ${this.getStoreHeaderHeight}px`
      }
    }
  },
  watch: {
    getStoreHeaderIndex (newIndex, oldIndex) {
      console.log(newIndex, oldIndex)
    }
  },
  methods: {
    ...mapActions({
      setHeaderIndexBySwipe: 'header/indexBySwipe'
    }),
    swipe (direction) {
      switch (direction) {
        case 'left':
          this.setHeaderIndexBySwipe(-1)
          break
        case 'right':
          this.setHeaderIndexBySwipe(1)
          break
        case 'bottom':
          console.log('swiping bottom')
          break
        case 'top':
          console.log('swiping top')
          break
        default:
          return false
      }
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

  #slider {
    transition: 1s ease-in-out translateX;
  }
</style>
