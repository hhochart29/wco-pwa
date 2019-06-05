import { weathers } from '@/graphql/query'

export const state = () => ({
  loaded: false
})

export const getters = {
  loaded: state => state.loaded
}

export const mutations = {
  LOADED (state) {
    state.loaded = true
  }
}

export const actions = {
  Loaded ({ commit }) {
    setTimeout(_ => {
      commit('LOADED')
    }, 1000)
  },
  async nuxtServerInit ({ commit }, { app }) {
    let client = app.apolloProvider.defaultClient
    let { data: { allWeathers } } = await client.query({ query: weathers })

    commit('vote/WEATHERS', allWeathers)
  }
}
