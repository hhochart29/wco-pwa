<template>
  <div v-if="allArticles && allArticles.length" class="wcocontainer">
      <ArticlePreview
        v-bind="article"
        v-for="article in allArticles"
        :key="article.id"
      />
  </div>
</template>

<script>
import { allArticles } from '@/graphql/query'
import ArticlePreview from '@/components/ArticlePreview'

export default {
  name: 'ArticleList',
  components: { ArticlePreview },
  data: () => ({
    allArticles: null
  }),
  apollo: {
    allArticles
  }
}
</script>
