<template>
  <article :style="articleBackgroundImage(image.url)" class="card bg-full">
    {{ title }}
  </article>
</template>

<script>
export default {
  name: 'ArticlePreview',
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
  .bg-full {
    @apply bg-no-repeat bg-cover bg-center;
  }
</style>
