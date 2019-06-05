<template>
  <div
    class="actions absolute wcocontainer text-white w-full bottom-0 top-0"
    @click="toggle"
  >
    <transition name="slide" mode="out-in" appear>
      <div v-if="toggled" key="b" class="bg-indigo p-5 w-full z-50">Le menu</div>
      <div v-else key="a">
        <div class="bg-indigo p-5 rounded-full">
          CLICK ME LUL
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    toggled: false
  }),
  methods: {
    toggle () {
      this.toggled = !this.toggled
    }
  }
}
</script>

<style lang="postcss" scoped>
.w-70 {
  width: 70%;
}
</style>
