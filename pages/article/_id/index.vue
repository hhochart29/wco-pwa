<template>
  <div v-if="article && Object.keys(article).length">Article Complet avec l'id : {{ $route.params.id }} - {{ article.title }}</div>
  <div v-else>L'article avec l'id {{ $route.params.id }} n'existe pas</div>
</template>

<script>
import { articleById } from '@/graphql/query'

export default {
  name: 'ArticleId',
  created () {
    this.$route.params.id = !this.$route.params.id ? 1 : this.$route.params.id
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  apollo: {
    article: {
      query: articleById,
      // function instead of object `variables` grants vue instance access :)
      variables () {
        return {
          id: this.$route.params.id
        }
      }
    }
  }
}
</script>
