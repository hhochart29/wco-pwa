<template>
  <div class="actions absolute wcocontainer text-white w-full bottom-0 top-0 flex">
    <transition name="slide" mode="out-in" appear>
      <map-modal v-if="voteActive" key="b">
        <h1 class="text-left">Faites votre choix</h1>
        <div class="flex flex-wrap justify-center pt-6">
          <div v-for="weather in weathersResult"
          :key="`weather-${weather.id}`"
          @click="setCurrentVote(weather.id)"
          class="weather flex items-center flex-col p-2 flex-grow-0"
          style="flex-basis: 50%;"
          :class="{'bg-grey-lighter text-indigo rounded': currentVote === weather.id}">
            <h2 class="text-xl font-bold mb-2">{{ weather.title }}</h2>
            <img :src="weather.image.url" class="w-20 h-20 bg-grey-lighter rounded-full p-2 shadow-xl">
            <span class="italic font-xs mt-2 text-center">
              {{ weather.description }}
            </span>
          </div>
        </div>
      </map-modal>
      <map-modal v-else-if="resultsActive" key="c">
        <h1 class="text-left">Résultats</h1>
        <div class="pt-12">
          <div
            v-for="weatherResult in weathersResult"
            :key="`weather-${weatherResult.id}`"
            class="mb-5"
          >
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xl font-bold">{{weatherResult.title }}</h3>
                <span class="italic text-sm">{{ weatherResult.voteCount }} Votes</span>
              </div>
              <img :src="weatherResult.image.url" class="w-12 bg-grey-lighter rounded-full p-2">
            </div>
            <div
              class="bg-white h-2"
              :style="{width: `${weatherResult.voteCount / totalVote * 100}%`}"
            />
          </div>
        </div>
      </map-modal>
      <div v-else key="a" class="self-end w-full flex justify-around">
        <div class="bg-indigo p-5 rounded-full font-bold" @click="setVoteActive">Vote</div>
        <div class="bg-indigo p-5 rounded-full font-bold" @click="setResultsActive">Résultats</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import mapModal from '@/components/mapModal'

export default {
  data: () => ({
    voteActive: false,
    resultsActive: false
  }),
  components: {
    mapModal
  },
  computed: {
    ...mapGetters({
      weathersResult: 'vote/weathers',
      currentVote: 'vote/currentVote'
    }),
    totalVote () {
      return this.weathersResult.reduce((acc, curr) => acc + curr.voteCount, 0)
    }
  },
  methods: {
    ...mapActions({
      setCurrentVote: 'vote/currentVote'
    }),
    close () {
      this.voteActive = this.resultsActive = false
    },
    setVoteActive () {
      this.voteActive = true
    },
    setResultsActive () {
      this.resultsActive = true
    }
  }
}
</script>

<style lang="postcss" scoped>
.w-70 {
  width: 70%;
}

.weather {
  transition: all ease-in-out 0.4s
}
</style>
