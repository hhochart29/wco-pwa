<template>
  <div class="actions absolute wcocontainer text-white w-full bottom-0 top-0 flex">
    <transition name="slide" mode="out-in" appear>
      <map-modal v-if="voteActive" key="b">
        <h1 class="text-left">Faites votre choix</h1>
        <div class="flex flex-wrap justify-center pt-6">
          <div
            v-for="weather in weathersResult"
            :key="`weather-${weather.id}`"
            @click="setCurrentVote(weather)"
            class="weather flex items-center flex-col p-2 flex-grow-0"
            style="flex-basis: 50%;"
            :class="{'bg-grey-lighter text-indigo rounded': currentVote && currentVote.id === weather.id}"
          >
            <h2 class="text-xl font-bold mb-2">{{ weather.title }}</h2>
            <img
              :src="weather.image.url"
              class="w-20 h-20 bg-grey-lighter rounded-full p-2 shadow-xl"
            >
            <span class="italic font-xs mt-2 text-center">{{ weather.description }}</span>
          </div>
          <div class="w-full bg-indigo-darker text-grey-lighter p-2 rounded text-center font-bold">Fin des votes a 19h</div>
        </div>
      </map-modal>
      <map-modal v-else-if="resultsActive" key="c">
        <h1 class="text-left">Résultats</h1>
        <div class="pt-5">
          <div
            v-for="weatherResult in weathersResult"
            :key="`weather-${weatherResult.id}`"
            class="mb-3 bg-indigo-darker p-2 rounded shadow-lg"
          >
            <div class="flex items-center justify-between">
              <div class="leading-tight">
                <h3 class="text-xl font-bold leading-tight">{{weatherResult.title }}</h3>
                <span class="italic text-xs leading-tight">{{ weatherResult.vote }} Votes</span>
                <br>
                <span class="italic text-sm leading-tight">{{ `${(weatherResult.vote / totalVote * 100).toFixed(2)} %` }}</span>
              </div>
              <img :src="weatherResult.image.url" class="w-12 bg-grey-lighter rounded-full p-2">
            </div>
            <div
              class="bg-white h-2 mt-1"
              :style="{width: `${weatherResult.vote / totalVote * 100}%`}"
            >
            </div>
          </div>

          <div class="mb-3 bg-indigo-lightest text-indigo-darker rounded shadow-lg" >
            <div class="w-full bg-indigo-darker text-indigo-lightest px-2 rounded-t">En tête</div>
            <div class="flex items-center justify-between p-2">
              <div class="leading-tight">
                <h3 class="text-xl font-bold leading-tight">{{ currentWinner.title }}</h3>
                <span class="italic text-xs leading-tight">{{ currentWinner.vote }} Votes</span>
                <br>
                <span class="italic text-sm leading-tight">{{ `${(currentWinner.vote / totalVote * 100).toFixed(2)} %` }}</span>
              </div>
              <img :src="currentWinner.image.url" class="w-12 bg-grey-lighter rounded-full p-2">
            </div>
          </div>
        </div>
      </map-modal>
      <map-modal v-else-if="error" key="d">
        <div class="wcocontainer">
          <h1 class="text-left">Vote impossible</h1>
          <span class="mt-5">
            Vous avez déjà un représentant
            Pour voter, vous avez besoin de reprendre votre vote.
            Pour ce faire, rendez-vous sur la
            <nuxt-link
              :to="{name: 'election-id', params: { id: currentDelegate.id } }"
              class="underline font-bold"
            >page du représentant</nuxt-link>
          </span>
        </div>
      </map-modal>
      <div v-else key="a" class="self-end w-full flex justify-around">
        <div class="bg-indigo px-5 py-3 rounded-full font-bold" @click="setVoteActive">Vote</div>
        <div class="bg-indigo px-5 py-3 rounded-full font-bold" @click="setResultsActive">Résultats</div>
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
    resultsActive: false,
    error: false
  }),
  components: {
    mapModal
  },
  computed: {
    ...mapGetters({
      weathersResult: 'vote/weathers',
      currentVote: 'vote/currentVote',
      currentDelegate: 'delegate/currentDelegate'
    }),
    totalVote () {
      return this.weathersResult.reduce((acc, curr) => acc + curr.vote, 0)
    },
    currentWinner () {
      let a = 0
      let i = 0
      this.weathersResult.forEach((result, index) => {
        if (result.vote > a) {
          a = result.vote
          i = index
        }
      })
      return this.weathersResult[i]
    }
  },
  methods: {
    ...mapActions({
      setCurrentVote: 'vote/currentVote'
    }),
    close () {
      this.voteActive = this.resultsActive = this.error = false
    },
    setVoteActive () {
      if (this.currentDelegate && this.currentDelegate.id) {
        this.error = true
        return false
      }
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
  transition: all ease-in-out 0.4s;
}
</style>
