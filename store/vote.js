export const state = () => ({
  weathers: [],
  currentVote: null
})

export const getters = {
  weathers: state => state.weathers,
  currentVote: state => state.currentVote
}

export const mutations = {
  WEATHERS (state, value) {
    state.weathers = value
  },
  CURRENT_VOTE (state, value) {
    state.currentVote = value
  }
}

export const actions = {
  currentVote ({ commit }, value) {
    commit('CURRENT_VOTE', value)
  }
}
