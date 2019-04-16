<template>
  <nuxt-link
    tag="article"
    :style="articleBackgroundImage(image.url)"
    class="bg-full card"
    :to="{name: 'article-id', params: { id: id } }"
  >
    <div class="articleTitle">
    {{ title }}
    </div>
    <p>
      {{ contentPreview }}
    </p>
  </nuxt-link>
</template>

<script>
export default {
  name: 'ArticlePreview',
  props: {
    id: String,
    title: String,
    image: Object,
    content: String
  },
  computed: {
    articleBackgroundImage () {
      return (url) => ({
        backgroundImage: `url(${url})`
      })
    },
    contentPreview () {
      return `${this.content.substr(0, 50)} ...`
    }
  }
}
</script>

<style scoped lang="postcss">
  .card {
    @apply p-3;
    @apply m-3;
    @apply cursor-pointer;
  }

  .bg-full {
    @apply bg-no-repeat bg-cover bg-center;
  }
</style>
