<template>
  <transition name="fade">
    <div
      class="relative w-full bg-indigo-lightest border-l-4 border-indigo text-indigo-dark px-4 py-2 my-2"
      role="alert"
      v-if="shown"
    >
      <span
        class="absolute right-0 top-0 bg-indigo text-indigo-lightest p-2 cursor-pointer rounded-bl-sm w-8"
        @click="shown = !shown"
      ><deleteIcon /></span>
      <p class="font-bold">{{ title }}</p>
      <p class="pt-2">
        <slot/>
      </p>
    </div>
  </transition>
</template>

<script>
import deleteIcon from '@/components/svg/delete'

export default {
  name: 'info',
  components: {
    deleteIcon
  },
  data: () => ({
    shown: true
  }),
  props: {
    title: {
      type: String,
      required: false,
      default: 'Information'
    }
  }
}
</script>
