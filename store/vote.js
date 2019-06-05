export const state = () => ({
  weathers: [],
  currentVote: null
})

export const getters = {
  weathers: (state) => {
    if (state.weathers.length > 0) {
      state.weathers[0].voteCount = 102284
      state.weathers[1].voteCount = 76550
      state.weathers[2].voteCount = 200003
      state.weathers[3].voteCount = 9987
      state.weathers[4].voteCount = 53457
    }
    return state.weathers
  },
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
