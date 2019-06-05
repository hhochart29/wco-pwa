<template>
  <div class="wcocontainer">
    <h1>Votre compte</h1>
    <div class="text-left" v-if="currentDelegate">Votre delegue en cours : {{ currentDelegate }}</div>
    <div v-else>
      Vous n'avez aucun representant pour le moment, vous pouvez en choisir un
      <n-link :to="{name: 'election'}">ici</n-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'account',
  async asyncData ({ app }) {
    if (app.$delay) {
      await app.$delay(600)
    }
  },
  data: () => ({
    delegateProfile: null
  }),
  computed: {
    ...mapGetters({
      currentDelegate: 'delegate/currentDelegate'
    })
  }
}
</script>
