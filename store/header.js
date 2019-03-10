export const state = () => ({
  height: 0,
  index: 0,
  tabs: 0
})

export const getters = {
  height: (state) => state.height,
  index: (state) => state.index,
  tabs: (state) => state.tabs
}

export const mutations = {
  HEIGHT (state, value) {
    state.height = value
  },
  INDEX (state, value) {
    if (value >= 0 && value <= state.tabs - 1) {
      state.index = value
    } else {
      alert('test')
    }
  },
  INDEX_BY_SWIPE (state, value) {
    if ((value > 0 && state.index < (state.tabs - 1)) || (value < 0 && state.index > 0)) {
      state.index += value
    }
  },
  TABS (state, value) {
    state.tabs = value
  }
}

export const actions = {
  height ({ commit }, value) {
    commit('HEIGHT', value)
  },
  index ({ commit }, value) {
    commit('INDEX', value)
  },
  indexBySwipe ({ commit }, value) {
    commit('INDEX_BY_SWIPE', value)
  },
  tabs ({ commit }, value) {
    commit('TABS', value)
  }
}
