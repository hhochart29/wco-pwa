<template>
  <div class="wcocontainer">
    <h1>Dernières actualités</h1>
    <div v-if="allArticles && allArticles.length">
      <ArticlePreview v-bind="article" v-for="article in allArticlesOrdered" :key="article.id"/>
    </div>
    <div class="mt-3 alert" role="alert" v-else>Aucun article pour le moment, revenez plus tard</div>
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
      }, 1000)
    })
  },
  apollo: {
    allArticles
  },
  computed: {
    allArticlesOrdered () {
      let a = this.allArticles
      return a.sort(function (a, b) { return a.dateTime > b.dateTime })
    }
  }
}
</script>
