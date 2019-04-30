<template>
  <nuxt-link tag="article" :to="{name: 'article-id', params: { id: id } }" class="card">
    <img src="https://tailwindcss.com/img/card-top.jpg">
    <div>
      <div>{{ title }}</div>
      <p>{{ contentPreview }}</p>
    </div>
    <div>
      <span>#photography</span>
      <span>#travel</span>
      <span>#winter</span>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'ArticlePreview',
  props: {
    id: String,
    title: String,
    image: Object,
    content: String
  },
  computed: {
    articleBackgroundImage () {
      return (url) => ({
        backgroundImage: `url(${url})`
      })
    },
    contentPreview () {
      return `${this.content.substr(0, 150)} ...`
    }
  }
}
</script>

<style scoped lang="postcss">
.card {
  @apply max-w-sm rounded overflow-hidden shadow-lg m-5;
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
        @apply inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2;
      }
    }
  }
}
</style>
