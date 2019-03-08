<template>
  <div>
    <Header ref="header" />
    <nuxt />
  </div>
</template>

<script>
import Header from '@/components/Header'
import { mapActions } from 'vuex'

export default {
  name: 'DefaultLayout',
  components: {
    Header
  },
  data: () => ({
    height: 0
  }),
  methods: {
    ...mapActions({
      setHeaderHeight: 'header/height'
    }),
    handleResize () {
      if (this.height === this.$refs.header.$el.clientHeight) return false
      this.height = this.$refs.header.$el.clientHeight
      this.setHeaderHeight(this.height)
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
