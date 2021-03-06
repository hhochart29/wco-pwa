<template>
  <div class="map-container relative" :style="mapHeight">
    <div ref="map" />
    <mapActions />
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import mapActions from '@/components/mapActions.vue'
import sun from '@/assets/images/sun.png'

export default {
  name: 'Map',
  components: {
    mapActions
  },
  data: () => ({
    map: null,
    mbgl: null,
    token: process.env.mapbox_token,
    style: 'mapbox://styles/herveh/cjukd6nxk0plk1fnu0k1w6pyo',
    zoom: 4,
    geolocate: null,
    geolocateControl: {
      positionOptions: { enableHighAccuracy: true },
      fitBoundsOptions: { maxZoom: 7 },
      trackUserLocation: true
    },
    icons: {
      sun
    }
  }),
  computed: {
    ...mapGetters({
      geolocation: 'map/geolocation',
      headerHeight: 'header/height'
    }),
    mapHeight () {
      return {
        height: `calc(100vh - ${this.headerHeight}px)`
      }
    }
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
        zoom: 4,
        pitch: 0,
        minZoom: 2,
        maxZoom: 20,
        attributionControl: false
      })
      // Disable pitch
      this.map.dragRotate.disable()

      this.geolocate = new this.mbgl.GeolocateControl(this.geolocateControl)
      this.map.addControl(this.geolocate, 'bottom-right')

      this.mapFullyLoaded(this.setMarkers)
    },
    mapFullyLoaded (callback) {
      if (this.map.loaded()) return this.$nextTick(callback)
      this.map.once('render', () => this.mapFullyLoaded(callback))
    },
    metersToPixelsAtMaxZoom: (meters, latitude) => meters / 0.075 / Math.cos(latitude * Math.PI / 180),
    setMarkers () {
      this.geolocate.trigger()

      this.map.addSource('cities-weather', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [this.geolocation.longitude, this.geolocation.latitude]
              }
            }]
        }
      })

      this.map.addLayer({
        'id': 'cities-weather',
        'type': 'circle',
        'source': 'cities-weather',
        'paint': {
          'circle-radius': {
            'base': 2,
            'stops': [[0, 0], [20, this.metersToPixelsAtMaxZoom(50000, this.geolocation.latitude)]]
          },
          'circle-color': '#6574cd',
          'circle-opacity': 0.3
        },
        'filter': ['==', '$type', 'Point']
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
