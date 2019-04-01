<template>
  <div id="loader">This is loading :)</div>
</template>

<script>
export default {
  name: 'Loader',
  data: () => ({
    loading: true
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>
