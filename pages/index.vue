<template>
  <div class="map-wrap" v-if="geolocationData">
    <MapComponent/>
  </div>
  <div v-else class="alert m-5" role="alert">Aucune coordonnées GPS de disponible</div>
</template>

<script>
import Map from '@/components/Map'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Map',
  components: {
    MapComponent: Map
  },
  asyncData () {
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve()
      }, 1000)
    })
  },
  computed: {
    ...mapGetters({
      geolocation: 'map/geolocation'
    }),
    geolocationData () {
      return this.geolocation && this.geolocation.latitude && this.geolocation.longitude
    }
  },
  beforeMount () {
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
