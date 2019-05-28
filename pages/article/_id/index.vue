<template>
  <div class="wcocontainer">
    <div
      v-if="article && Object.keys(article).length"
    >Article Complet avec l'id : {{ $route.params.id }} - {{ article.title }}</div>
    <info v-else>L'article avec l'id {{ $route.params.id }} n'existe pas</info>
  </div>
</template>

<script>
import { articleById } from '@/graphql/query'
import info from '@/components/info'

export default {
  name: 'ArticleId',
  components: {
    info
  },
  async asyncData ({ app, params }) {
    let client = app.apolloProvider.defaultClient
    let { data } = await client.query({ query: articleById, variables: { id: params.id } })
    if (app.$delay) {
      await app.$delay(600)
    }

    return data
  },
  created () {
    this.$route.params.id = !this.$route.params.id ? 1 : this.$route.params.id
  }
}
</script>
