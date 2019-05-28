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
  asyncData () {
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve()
      }, 1000)
    })
  },
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
