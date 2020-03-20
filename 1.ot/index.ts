import { Observable } from 'rxjs'

const observableCreated$ = Observable.create((observer) => {
  for (let i = 1; i <= 10; i++) {
    setTimeout(() => {
      observer.next(i)
      if (i === 10) {
        observer.complete()
      }
    }, 300 * i)
  }
})

observableCreated$.subscribe(
  (item) => {
    console.log(`observerA: ${item}`)
  },
  (error) => {
    console.log(`observerA: ${error}`)
  },
  () => {
    console.log(`observerA: complete`)
  }
)

setTimeout(() => {
  observableCreated$.subscribe(
    (item) => {
      console.log(`observerB: ${item}`)
    },
    (error) => {
      console.log(`observerB: ${error}`)
    },
    () => {
      console.log(`observerB: complete`)
    }
  )
}, 1350)
