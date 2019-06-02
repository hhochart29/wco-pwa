import dayjs from 'dayjs'
import 'dayjs/locale/fr'

dayjs.locale('fr')

export default (ctx, inject) => {
  ctx.$dayjs = dayjs
  inject('dayjs', dayjs)
  inject('delay', (duration) => {
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve()
      }, duration)
    })
  })
}
