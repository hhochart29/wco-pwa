<template xmlns:v-touch="http://www.w3.org/1999/xhtml">
  <div>
    <transition name="fade">
      <div v-show="!isPageLoaded" class="loading-modal">Weather Control Organization</div>
    </transition>
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
  @apply text-lg;
  @apply font-bold;
  @apply bg-indigo;
  @apply h-screen;
  @apply w-screen;
  @apply fixed;
  z-index: 9999;
}

.layout-container {
  flex-basis: 100%;
  @apply bg-grey-lighter;
  @apply text-indigo;
  @apply flex-shrink-0;
  @apply items-start;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.width-enter-active,
.width-leave-active {
  transition: width 0.4s;
}

.width-enter,
.width-leave-to {
  width: 0px;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s;
}

.slide-enter,
.slide-leave-to {
  transform: scaleY(0);
}
</style>
