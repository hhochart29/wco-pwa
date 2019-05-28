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
  setCurrentDelegate ({ commit }, value) {
    commit('SET_CURRENT_DELEGATE', value)
  }
}
