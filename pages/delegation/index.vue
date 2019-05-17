<template>
  <div class="wcocontainer">
    <h1>Élection</h1>
    <div v-if="allDelegation && allDelegation.length">
      <DelegationPreview v-for="(delelgation, index) in allDelegation" :key="`${delegation}-${index}`" />
    </div>
    <div class="mt-3 alert" role="alert" v-else>Aucun représentant(s) pour le moment, revenez plus tard</div>
  </div>
</template>

<script>
import DelegationPreview from '@/components/DelegationPreview'

export default {
  name: 'Delegation',
  components: {
    DelegationPreview
  },
  data: () => ({
    allDelegation: null
  }),
  asyncData () {
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve()
      }, 1000)
    })
  }
}
</script>
