<template>
  <nuxt-link tag="article" :to="{name: 'article-id', params: { id: id } }" class="card">
    <img :src="image.url" alt="image.alt">
    <div>
      <div>{{ title }}</div>
      <p>{{ contentPreview }}</p>
    </div>
    <div>
      <span>
        <img :src="source.picture.url">
        {{ source.name }}
      </span>
      <span>{{ date }}</span>
    </div>
  </nuxt-link>
</template>

<script>
import dayjs from 'dayjs'
import 'dayjs/locale/fr'

export default {
  name: 'ArticlePreview',
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
      return dayjs(this.dateTime).locale('fr').format('Publié à HH:mm le D MMM YYYY')
    },
    contentPreview () {
      return `${this.content.substr(0, 150)} ...`
    }
  }
}
</script>

<style scoped lang="postcss">
.card {
  @apply rounded overflow-hidden shadow-lg m-5 flex-grow;
  flex-basis: 17rem;
  & img {
    @apply w-full;
  }
  & > div {
    @apply px-6 py-4;
    &:first-of-type {
      & > div {
        @apply font-bold text-xl mb-2;
      }
      & > p {
        @apply text-grey-darker text-base;
      }
    }
    &:last-of-type {
      & > span {
        @apply inline-block bg-grey-lighter rounded-full px-3 py-1 my-1 text-sm font-semibold text-grey-darker mr-2;
        & > img {
          @apply w-6 rounded-lg align-middle;
        }
      }
    }
  }
}
</style>
