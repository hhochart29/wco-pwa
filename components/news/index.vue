<template>
  <div v-if="allArticles && allArticles.length">
    <div v-for="article in allArticles" :key="article.id">
      <Article v-bind="article" />
    </div>
  </div>
  <Loader v-else />
</template>

<script>
import { allArticles } from '@/graphql/query'
import Loader from '@/components/Loader'
import Article from '@/components/news/Article'

export default {
  name: 'News',
  components: { Loader, Article },
  data: () => ({
    allArticles: null
  }),
  apollo: {
    allArticles
  }
}
</script>
