<template>
  <div ref="map"/>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Map',
  data: () => ({
    map: null,
    mbgl: null,
    token: process.env.mapbox_token,
    style: 'mapbox://styles/herveh/cjukd6nxk0plk1fnu0k1w6pyo',
    zoom: 12
  }),
  computed: {
    ...mapGetters({
      geolocation: 'map/geolocation'
    })
  },
  mounted () {
    require('mapbox-gl/dist/mapbox-gl.css')
    this.mbgl = require('mapbox-gl/dist/mapbox-gl.js')
    this.createMap()
  },
  methods: {
    createMap () {
      this.mbgl.accessToken = this.token
      this.map = new this.mbgl.Map({
        container: this.$refs.map,
        style: this.style,
        center: [this.geolocation.longitude, this.geolocation.latitude],
        zoom: 12,
        pitch: 0,
        minZoom: 2,
        maxZoom: 20,
        attributionControl: false
      })
      const geolocate = new this.mbgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
      this.map.addControl(geolocate, 'bottom-right')
      this.map.on('load', () => {
        setTimeout(_ => {
          geolocate.trigger()
        }, 1000)
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.mapboxgl-map,
.mapboxgl-map canvas {
  @apply h-full w-full;
}
</style>
