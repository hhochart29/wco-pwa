<template>
  <div class="bg-indigo-darkest text-indigo-lightest px-3 pt-2 pb-1 flex justify-between">
    <div class="flex">
      <nuxt-link to="/" tag="div" class="px-2">
        <img class="rounded-full md:w-8" src="https://via.placeholder.com/50x50">
      </nuxt-link>
      <nuxt-link to="/news" tag="div" class="px-2">
        <img class="rounded-full md:w-8" src="https://via.placeholder.com/50x50">
      </nuxt-link>
      <nuxt-link to="/delegation" tag="div" class="px-2">
        <img class="rounded-full md:w-8" src="https://via.placeholder.com/50x50">
      </nuxt-link>
    </div>

    <div class="flex items-center">
      <div class="mr-2 md:text-xs">
        Mr. Moussard
      </div>
      <div>
        <img class="rounded-full md:w-8" src="https://via.placeholder.com/50x50">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data: () => ({})
}
</script>
