<template>
  <article v-if="article && Object.keys(article).length">
    <h1 class="wcocontainer">{{ article.title }}</h1>
    <div class="flex flex-wrap mb-3">
      <div class="flex py-1 px-2 bg-grey-light rounded-full info mx-2 my-1 text-xs italic">
        <timeIcon class="w-4 h-4 align-middle mr-2 inline"/>
        {{ date }}
      </div>
      <div class="flex py-1 px-2 bg-grey-light rounded-full info mx-2 my-1 text-xs italic">
        <hourglass class="w-4 h-4 align-middle mr-2 inline"/>
        {{ article.readingTime }}mn
      </div>
      <div class="flex py-1 px-2 bg-grey-light rounded-full info mx-2 my-1 text-xs italic">
        <img
          :src="article.source.picture.url"
          class="w-4 h-4 align-middle mr-2 inline rounded-full"
        >
        {{ article.source.name }}
      </div>
    </div>
    <div class="relative">
      <img :src="article.image.url">
    </div>
    <div class="wcocontainer" v-html="article.content"/>
  </article>
  <info v-else>L'article avec l'id {{ $route.params.id }} n'existe pas</info>
</template>

<script>
import { articleById } from '@/graphql/query'
import info from '@/components/info'
import hourglass from '@/components/svg/hourglass'
import timeIcon from '@/components/svg/time'

export default {
  name: 'ArticleId',
  components: {
    info,
    hourglass,
    timeIcon
  },
  async asyncData ({ app, params }) {
    let client = app.apolloProvider.defaultClient
    let { data } = await client.query({ query: articleById, variables: { id: params.id } })
    if (app.$delay) {
      await app.$delay(600)
    }

    return data
  },
  computed: {
    date () {
      return this.$dayjs && this.$dayjs(this.article.dateTime).format('HH:mm, D MMM YYYY')
    }
  },
  created () {
    this.$route.params.id = !this.$route.params.id ? 1 : this.$route.params.id
  },
  mounted () {
    if (this.$route.params.id === '1081315') {
      this.$store.dispatch('vote/update')
    }
  }
}
</script>

<style lang="postcss">
blockquote {
  @apply p-3 my-2;
  @apply bg-grey-light;
  @apply text-grey-darker;
}
</style>
