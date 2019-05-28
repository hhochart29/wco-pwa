<template>
  <div class="wcocontainer">
    <div
      v-if="delegate && Object.keys(delegate).length"
    >Article Complet avec l'id : {{ $route.params.id }} - {{ delegate.name }}</div>
    <info v-else>Le délégué avec l'id {{ $route.params.id }} n'existe pas</info>
  </div>
</template>

<script>
import { delegateById } from '@/graphql/query'
import info from '@/components/info'

export default {
  name: 'ArticleId',
  components: {
    info
  },
  async asyncData ({ app, params }) {
    let client = app.apolloProvider.defaultClient
    let { data } = await client.query({ query: delegateById, variables: { id: params.id } })
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
