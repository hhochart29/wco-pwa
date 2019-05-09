export const state = () => ({
  height: 0
})

export const getters = {
  height: (state) => state.height
}

export const mutations = {
  HEIGHT (state, value) {
    state.height = value
  }
}

export const actions = {
  async height ({ commit, dispatch }, value) {
    await commit('HEIGHT', value)
    await dispatch('Loaded', null, { root: true })
  }
}
