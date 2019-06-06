<template>
  <div class="map-wrap" v-if="geolocationData">
    <MapComponent/>
  </div>
  <info v-else title="Aucune coordonnées GPS" class="m-5">Veuillez autoriser la localisation dans votre navigateur</info>
</template>

<script>
import Map from '@/components/Map'
import info from '@/components/info'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Map',
  components: {
    MapComponent: Map,
    info
  },
  async asyncData ({ app }) {
    if (app.$delay) {
      await app.$delay(800)
    }
  },
  computed: {
    ...mapGetters({
      geolocation: 'map/geolocation'
    }),
    geolocationData () {
      return this.geolocation && this.geolocation.latitude && this.geolocation.longitude
    }
  },
  mounted () {
    this.setGeolocation()
  },
  methods: {
    ...mapActions({
      setGeolocation: 'map/geolocation'
    })
  }
}
</script>

<style lang="postcss">
.map-wrap {
  @apply h-full w-full;
}
</style>
