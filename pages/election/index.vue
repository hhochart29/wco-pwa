<template>
  <div class="wcocontainer">
    <h1>Élection</h1>
    <div v-if="allDelegates && allDelegates.length">
      <DelegatePreview v-for="delegate in allDelegates" v-bind="delegate" :key="delegate.id" />
    </div>
    <div class="mt-3 alert" role="alert" v-else>Aucun représentant(s) pour le moment, revenez plus tard</div>
  </div>
</template>

<script>
import DelegatePreview from '@/components/DelegatePreview'
import { allDelegates } from '@/graphql/query'

export default {
  name: 'Delegation',
  components: {
    DelegatePreview
  },
  data: () => ({
    allDelegates: null
  }),
  apollo: {
    allDelegates
  },
  asyncData () {
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve()
      }, 1000)
    })
  }
}
</script>
