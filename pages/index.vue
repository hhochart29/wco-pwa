<template>
  <div class="map-wrap" v-if="lat !== undefined && lng !== undefined">
    <no-ssr>
      <l-map :zoom=13 :center="[lat, lng]">
        <l-tile-layer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        <l-marker :lat-lng="[lat, lng]" />
      </l-map>
    </no-ssr>
  </div>
  <div v-else class="alert m-5" role="alert">Aucune coordonnées GPS de disponible</div>
</template>

<script>
export default {
  name: 'Map',
  data: () => ({
    location: {}
  }),
  computed: {
    lat () {
      return this.location.latitude
    },
    lng () {
      return this.location.longitude
    }
  },
  beforeMount () {
    try {
      this.getLocation()
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    getLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.location = position.coords
          },
          (error) => console.error(error))
      } else {
        console.log('Geo Location not supported by browser')
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="postcss" scoped>
  .map-wrap {
    @apply h-full w-full;
  }
</style>
