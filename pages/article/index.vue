<template>
  <div v-if="allArticles && allArticles.length">
    <div v-for="article in allArticles" :key="article.id" class="cursor-pointer">
      <nuxt-link :to="{name: 'article-id', params: { id: article.id } }">
        <ArticlePreview v-bind="article" />
      </nuxt-link>
    </div>
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
