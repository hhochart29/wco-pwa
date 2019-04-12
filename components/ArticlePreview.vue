<template>
  <nuxt-link
    tag="article"
    :style="articleBackgroundImage(image.url)"
    class="bg-full card"
    :to="{name: 'article-id', params: { id: id } }"
    >
    {{ title }}
  </nuxt-link>
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
  @apply cursor-pointer;
}
.bg-full {
  @apply bg-no-repeat bg-cover bg-center;
}
</style>
