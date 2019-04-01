<template>
  <div v-if="allArticles && allArticles.length">
    <div v-for="article in allArticles" :key="article.id" class="cursor-pointer">
      <nuxt-link :to="{name: 'article-id', params: { id: article.id } }">
        <ArticlePreview v-bind="article" />
      </nuxt-link>
    </div>
  </div>
  <Loader v-else />
</template>

<script>
import { allArticles } from '@/graphql/query'
import Loader from '@/components/Loader'
import ArticlePreview from '@/components/ArticlePreview'

export default {
  name: 'ArticleList',
  components: { Loader, ArticlePreview },
  data: () => ({
    allArticles: null
  }),
  apollo: {
    allArticles
  }
}
</script>
