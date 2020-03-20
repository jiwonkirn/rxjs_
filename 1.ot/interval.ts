import { interval } from 'rxjs'

const observable = interval(1000)

const subscibption = observable.subscribe((item) => {
  console.log(item)
})

setTimeout(() => {
  subscibption.unsubscribe()
}, 2000)
