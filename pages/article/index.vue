<template>
  <div>
    <h1 class="pb-0 wcocontainer">Dernières actualités</h1>
    <div v-if="allArticles && allArticles.length" class="wcocontainer">
      <ArticlePreview v-bind="article" v-for="article in allArticles" :key="article.id"/>
    </div>
    <div v-else>Aucun article pour le moment, revenez plus tard</div>
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
  asyncData () {
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve()
      }, 800)
    })
  },
  apollo: {
    allArticles
  }
}
</script>
