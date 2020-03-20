import { Observable } from 'rxjs'

const observable1to10$ = Observable.create(observer => {
  try {
    console.log('observabler start')
    for (let i = 1; i <= 10; i++) {
      observer.next(i)
      console.log(`observer.next(${i})`)
      throw new Error('error occurred')
    }
  } catch (error) {
    observer.error(error)
  }
  // observer.complete()
  console.log('observer end')
  
  return () => {
    console.log('observable1to10 unsubscribed')
  }
})

observable1to10$.subscribe(
  (value) => console.log(value),
  (error) => console.log(error),
  () => console.log('completed')
)
