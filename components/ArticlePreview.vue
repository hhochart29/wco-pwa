<template>
  <nuxt-link
    tag="article"
    :to="{name: 'article-id', params: { id: id } }"
    class="card rounded overflow-hidden shadow-lg m-5 flex-grow"
  >
    <img :src="image.url" alt="image.alt" class="w-full">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ title }}</div>
      <p class="text-grey-darker text-base">{{ contentPreview }}</p>
    </div>
    <div class="px-6 py-4 flex flex-wrap justify-between">
      <span
        class="inline-block bg-grey-light rounded-full px-3 py-1 my-1 text-sm font-semibold text-grey-darker"
      >
        <img :src="source.picture.url" class="w-6 rounded-full align-middle mr-2">
        {{ source.name }}
      </span>
      <span
        class="inline-block bg-grey-light rounded-full px-3 py-1 my-1 text-sm font-semibold text-grey-darker"
      >
        <time-icon class="w-6 rounded-lg align-middle mr-2 fill-curent text-grey-darker"/>
        {{ date }}
      </span>
      <span
        class="inline-block bg-grey-light rounded-full px-3 py-1 my-1 text-sm font-semibold text-grey-darker"
      >
        <hour-glass  class="w-6 align-middle mr-2 fill-curent text-grey-darker" />
        {{ readingTime }}mn
      </span>
    </div>
  </nuxt-link>
</template>

<script>
import timeIcon from '@/components/svg/time'
import hourGlass from '@/components/svg/hourglass'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'

export default {
  name: 'ArticlePreview',
  components: {
    timeIcon,
    hourGlass
  },
  props: {
    id: String,
    title: String,
    image: Object,
    content: String,
    source: Object,
    readingTime: Number,
    dateTime: String
  },
  computed: {
    articleBackgroundImage () {
      return (url) => ({
        backgroundImage: `url(${url})`
      })
    },
    date () {
      return dayjs(this.dateTime).locale('fr').format('HH:mm, D MMM YYYY')
    },
    contentPreview () {
      return `${this.content.substr(0, 150)} ...`
    }
  }
}
</script>

<style scoped lang="postcss">
.card {
  flex-basis: 17rem;
}
</style>
