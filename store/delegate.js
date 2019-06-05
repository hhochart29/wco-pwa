import { delegateById } from '@/graphql/query'

export const state = () => ({
  currentDelegate: null
})

export const getters = {
  currentDelegate: state => state.currentDelegate
}

export const mutations = {
  SET_CURRENT_DELEGATE (state, value) {
    state.currentDelegate = value
  }
}

export const actions = {
  async setCurrentDelegate ({ commit, dispatch }, value) {
    dispatch('vote/currentVote', null, { root: true })
    if (value) {
      let client = this.app.apolloProvider.defaultClient
      let { data: { delegate } } = await client.query({ query: delegateById, variables: { id: value } })
      commit('SET_CURRENT_DELEGATE', delegate)
    } else {
      commit('SET_CURRENT_DELEGATE', null)
    }
  }
}
