export const state = () => ({
  weathers: [],
  currentVote: null
})

export const getters = {
  weathers: (state) => state.weathers,
  currentVote: state => state.currentVote
}

export const mutations = {
  WEATHERS (state, value) {
    state.weathers = value
  },
  CURRENT_VOTE (state, value) {
    state.currentVote = value
  },
  UPDATE (state) {
    state.weathers[0].vote = 119102
    state.weathers[1].vote = 60200
    state.weathers[2].vote = 55093
    state.weathers[3].vote = 122599
    state.weathers[4].vote = 140202
  }
}

export const actions = {
  currentVote ({ commit, getters }, value) {
    commit('CURRENT_VOTE', value)
  },
  async update ({ commit }) {
    // a[0].vote = 200103
    // a[1].vote = 102284
    // a[2].vote = 92987
    // a[3].vote = 76550
    // a[4].vote = 53457
    commit('UPDATE')
  }
}
