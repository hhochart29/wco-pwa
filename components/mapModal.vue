<template>
  <div class="bg-indigo p-5 w-full z-50 rounded relative">
    <div @click="$parent.close" class="absolute right-0 top-0 px-4 py-2 mt-3 mr-1">
      <delete-icon class="h-6" />
    </div>
    <slot />
  </div>
</template>

<script>
import deleteIcon from '@/components/svg/delete'

export default {
  components: {
    deleteIcon
  }
}
</script>
