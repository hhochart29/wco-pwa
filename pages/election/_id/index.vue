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
    delegate: {
      query: delegateById,
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
