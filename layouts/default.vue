<template xmlns:v-touch="http://www.w3.org/1999/xhtml">
  <div>
    <div v-if="!isPageLoaded" class="loading-modal">First Loader</div>
    <Header ref="header"/>
    <div class="slider-wrapper">
      <div
        :style="style"
        class="flex layout-container"
        id="slider"
        ref="slider"
        v-touch:swipe="swipe"
      >
        <nuxt/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'DefaultLayout',
  components: {
    Header
  },
  data: () => ({
    height: 0
  }),
  computed: {
    ...mapGetters({
      getStoreHeaderHeight: 'header/height',
      isPageLoaded: 'loaded'
    }),
    style () {
      return {
        minHeight: `calc(100vh - ${this.getStoreHeaderHeight}px)`
      }
    }
  },
  methods: {
    ...mapActions({
      setHeaderHeight: 'header/height'
    }),
    handleResize () {
      if (this.height === this.$refs.header.$el.clientHeight) return false
      this.height = this.$refs.header.$el.clientHeight
      this.setHeaderHeight(this.height)
    },
    swipe (direction) {
      switch (direction) {
        case 'left':
          break
        case 'right':
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
  },
  mounted () {
    this.height = this.$refs.header.$el.clientHeight
    this.setHeaderHeight(this.height)
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style lang="postcss">
.loading-modal {
  @apply p-5;
  @apply flex;
  @apply justify-center;
  @apply items-center;
  @apply text-indigo-lightest;
  @apply bg-indigo-darkest;
  @apply h-screen;
  @apply w-screen;
  @apply fixed;
  z-index: 9999;
}

.layout-container {
  flex-basis: 100%;
  @apply bg-grey-light;
  @apply flex-no-shrink;
  @apply items-start;
}
</style>
