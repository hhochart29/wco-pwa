<template>
  <div
    class="py-2 my-5 w-16 flex flex-col justify-around items-center overflow-hidden bg-indigo rounded-tr-sm rounded-br-sm"
  >
    <div @click="removeDelegate">
      <delete class="rounded-full bg-grey-lighter p-2 w-10 h-10 text-red" />
    </div>
    <div @click="chooseDelegate">
      <tick class="rounded-full bg-grey-lighter p-2 w-10 h-10 text-green" />
    </div>
  </div>
</template>

<script>
import Delete from '@/components/svg/delete'
import Tick from '@/components/svg/tick'
import { mapActions } from 'vuex'

export default {
  name: 'delegate-picker',
  components: {
    Delete,
    Tick
  },
  props: {
    id: {
      required: true,
      type: [Number, String]
    }
  },
  methods: {
    ...mapActions({
      setCurrentDelegate: 'delegate/setCurrentDelegate'
    }),
    chooseDelegate () {
      this.setCurrentDelegate(this.id)
    },
    removeDelegate () {
      this.setCurrentDelegate(null)
    }
  }
}
</script>
