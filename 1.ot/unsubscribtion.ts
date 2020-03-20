import { interval, observable } from 'rxjs'

const observable1 = interval(400)
const observable2 = interval(300)

const subscribtion = observable1.subscribe((x) => console.log(`first: ${x}`))
const childSubscribtion = observable2.subscribe((x) => console.log(`second: ${x}`))

subscribtion.add(childSubscribtion)

setTimeout(() => {
  subscribtion.unsubscribe()
}, 1000)
