<template>
  <div class="mb-5 p-5 border-l-8 border-indigo">
    <img :src="avatar.url" :alt="avatar.alt" />
    {{ name }} - {{ firstname }} - {{ age }} - {{ job }} - {{ description }} {{ totalvote }}
    <ul>
      <li v-for="({ weather }, index) in weathervotes" :key="`${weather.title}-${index}`">{{ weather.title }} - <img :src="weather.image.url" :alt="weather.image.alt" /> - {{ weather.description }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    name: String,
    firstname: String,
    age: Number,
    avatar: Object,
    description: String,
    job: String,
    since: String,
    totalvote: Number,
    weathervotes: Array
  }
}
</script>
