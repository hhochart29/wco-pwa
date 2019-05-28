export default ({ app }, inject) => {
  inject('delay', (duration) => {
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve()
      }, duration)
    })
  })
}
