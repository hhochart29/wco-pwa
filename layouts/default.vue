<template>
  <div>
    <Header ref="header" />
    <div class="slider-wrapper overflow-hidden">
      <div :style="style" class="flex basic-container" id="slider" ref="slider" v-touch:swipe="swipe">
        <nuxt />
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
      getStoreHeaderHeight: 'header/height'
    }),
    style () {
      return {
        height: `calc(100vh - ${this.getStoreHeaderHeight}px`
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
  .container-full {
    @apply px-5;
    @apply py-5;
  }

  .flex-basis-100 {
    flex-basis: 100%;
  }

  .basic-container {
    @apply container-full;
    @apply bg-grey-light;
    @apply flex-basis-100;
    @apply flex-no-shrink;
    @apply items-start;
  }
</style>
