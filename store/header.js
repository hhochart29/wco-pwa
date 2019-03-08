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
  height ({ commit }, value) {
    commit('HEIGHT', value)
  }
}
