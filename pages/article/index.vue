<template>
  <div class="wcocontainer">
    <h1>Dernières actualités</h1>
    <div v-if="allArticles && allArticles.length">
      <ArticlePreview v-bind="article" v-for="article in allArticlesOrdered" :key="article.id"/>
    </div>
    <info v-else title="Aucun article" class="mt-3">Revenez plus tard</info>
  </div>
</template>

<script>
import { allArticles } from '@/graphql/query'
import ArticlePreview from '@/components/ArticlePreview'
import info from '@/components/info'

export default {
  name: 'ArticleList',
  components: { ArticlePreview, info },
  data: () => ({
    allArticles: null
  }),
  async asyncData ({ app }) {
    let client = app.apolloProvider.defaultClient
    let { data } = await client.query({ query: allArticles })
    if (app.$delay) {
      await app.$delay(600)
    }

    return data
  },
  computed: {
    allArticlesOrdered () {
      let a = this.allArticles
      return a.sort(function (a, b) { return a.dateTime > b.dateTime })
    }
  }
}
</script>
