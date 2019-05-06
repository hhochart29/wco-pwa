<template>
  <div ref="map" :style="mapHeight" />
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
    zoom: 12,
    geolocate: null
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
        zoom: 6,
        pitch: 0,
        minZoom: 2,
        maxZoom: 20,
        attributionControl: false
      })
      // Disable pitch
      this.map.dragRotate.disable()

      this.geolocate = new this.mbgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        fitBoundsOptions: { maxZoom: 8 },
        trackUserLocation: true
      })
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
                coordinates: [this.geolocation.longitude + 1, this.geolocation.latitude + 1]
              },
              properties: {
                'marker-color': '#3bb2d0',
                'marker-size': 'large',
                'marker-symbol': 'rocket'
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
          'circle-color': '#B42222',
          'circle-opacity': 0.6
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
