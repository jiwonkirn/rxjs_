import { Observable } from 'rxjs'

const observable1to10$ = Observable.create((observer) => {
  console.log('[observable1to10] BEGIN')

  for (let i = 1; i <= 10; i++) {
    observer.next(i)
  }

  // observer.complete()

  // observer.next(11)
  // observer.error(new Error('error'))
  // observer.complete(11)

  console.log('[observable1to10] END')

  return () => {
    console.log('[observable1to10] unsubscribe')
  } 
})

observable1to10$.subscribe((value) => console.log(`next value: ${value}`))
