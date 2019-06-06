export const state = () => ({
  geolocation: null
})

export const getters = {
  geolocation: state => state.geolocation
}

export const mutations = {
  GEOLOCATION (state, value) {
    state.geolocation = value
  }
}

export const actions = {
  setGeolocation ({ commit }) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          commit('GEOLOCATION', position.coords)
        },
        (error) => console.error(error))
    } else {
      console.log('Geo Location not supported by browser')
    }
  }
}
