<template>
  <div ref="map" :style="mapHeight"/>
</template>

<script>
import { mapGetters } from 'vuex'
import sun from '@/assets/images/sun.png'

export default {
  name: 'Map',
  data: () => ({
    map: null,
    mbgl: null,
    token: process.env.mapbox_token,
    style: 'mapbox://styles/herveh/cjukd6nxk0plk1fnu0k1w6pyo',
    zoom: 12,
    geolocate: null,
    geolocateControl: {
      positionOptions: { enableHighAccuracy: true },
      fitBoundsOptions: { maxZoom: 10 },
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
        zoom: 8,
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
                coordinates: [this.geolocation.longitude + 0.3, this.geolocation.latitude + 0.3]
              },
              properties: {
                icon: {
                  iconUrl: this.icons.sun,
                  iconSize: [50, 50], // size of the icon
                  iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
                  popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
                  className: 'dot'
                }
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

      // create a HTML element for each feature
      let el = document.createElement('div')
      el.className = 'marker'

      // make a marker for each feature and add to the map
      new this.mbgl.Marker(el)
        .setLngLat([this.geolocation.longitude + 0.02, this.geolocation.latitude + 0.02])
        .addTo(this.map)
    }
  }
}
</script>

<style lang="postcss" scoped>
.mapboxgl-map,
.mapboxgl-map canvas {
  @apply h-full w-full;
}

.marker {
  background-image: url('../assets/images/sun.png');
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
