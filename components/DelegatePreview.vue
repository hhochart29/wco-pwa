<template>
  <div class="mb-5 p-4 border-l-4 border-indigo shadow bg-grey-lightest flex items-center flex-wrap">
    <div class="w-full">
      <h2 class="inline text-md">{{ name }} {{ firstname}}</h2><span class="text-xl">, {{ age }} ans</span>
    </div>
    <div class="mt-5 w-full flex flex-wrap items-center">
      <img :src="avatar.url" :alt="avatar.alt" class="rounded-full w-24" />
      <div class="flex-grow">
        <span>Résumé</span>
      </div>
    </div>
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
    job: String,
    since: String,
    totalvote: Number
  }
}
</script>
