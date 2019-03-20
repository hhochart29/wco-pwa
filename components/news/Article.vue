<template>
  <article :style="articleBackgroundImage(image.url)" class="card">
    {{ title }}
  </article>
</template>

<script>
export default {
  name: 'Article',
  props: {
    id: String,
    title: String,
    image: Object
  },
  computed: {
    articleBackgroundImage () {
      return (url) => ({
        backgroundImage: `url(${url})`
      })
    }
  }
}
</script>

<style scoped lang="postcss">
  .card {
    @apply p-3;
  }
</style>
