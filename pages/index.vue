<template xmlns:v-touch="http://www.w3.org/1999/xhtml">
  <div class="slider-wrapper overflow-hidden">
    <div :style="style" class="flex" id="slider" ref="slider" v-touch:swipe="swipe">
      <Map class="basic-container" />
      <News class="basic-container" />
      <Delegation class="basic-container" />
    </div>
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
        height: `calc(100vh - ${this.getStoreHeaderHeight}px`,
        transform: `translateX(calc(-${this.getStoreHeaderIndex} * 100%))`
      }
    }
  },
  methods: {
    ...mapActions({
      setHeaderIndexBySwipe: 'header/indexBySwipe'
    }),
    swipe (direction) {
      switch (direction) {
        case 'left':
          this.setHeaderIndexBySwipe(1)
          break
        case 'right':
          this.setHeaderIndexBySwipe(-1)
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
    }
  }
}
</script>

<style lang="postcss">
  .container-full {
    @apply px-5;
    @apply py-5;
  }

  .basic-container {
    @apply container-full;
    @apply bg-grey-light;
    @apply flex-basis-100;
    @apply flex-no-shrink;
  }

  .flex-basis-100 {
    flex-basis: 100%;
  }

  #slider {
    transition: 0.4s ease-in-out transform;
  }
</style>
