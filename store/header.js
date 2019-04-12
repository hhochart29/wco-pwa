export const state = () => ({
  height: 0,
  tabs: 0
})

export const getters = {
  height: (state) => state.height,
  tabs: (state) => state.tabs
}

export const mutations = {
  HEIGHT (state, value) {
    state.height = value
  },
  TABS (state, value) {
    state.tabs = value
  }
}

export const actions = {
  async height ({ commit, dispatch }, value) {
    await commit('HEIGHT', value)
    await dispatch('Loaded', null, { root: true })
  },
  tabs ({ commit }, value) {
    commit('TABS', value)
  }
}
