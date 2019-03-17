<template>
  <div v-if="allArticles && allArticles.length">
    <article v-for="article in allArticles" :key="article.id" :style="articleBackgroundImage(article.image.url)" class="card">
      {{ article.title }}
    </article>
  </div>
  <Loader v-else />
</template>

<script>
import { allArticles } from '@/graphql/query'
import Loader from '@/components/Loader'

export default {
  name: 'News',
  components: { Loader },
  data: () => ({
    allArticles: null
  }),
  apollo: {
    allArticles
  },
  computed: {
    articleBackgroundImage: () => {
      return (url) => ({
        backgroundImage: `url(${url})`
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
  .card {
    @apply p-3;
  }
</style>
