import { Observable } from 'rxjs'
import { map, toArray } from 'rxjs/operators'

// const observableCreated$ = Observable.create((observer) => {
//   observer.next(1)
//   observer.next(2)
//   observer.complete()
// })

// observableCreated$.pipe(
//   map((value: number) => value * 2)
// ).subscribe((value) => console.log(value))

const observableCreated$ = Observable.create((observer) => {
  console.log('Observable BEGIN')
  const arr = [1, 2, 3]
  for (let  i = 0; i < arr.length; i++) {
    console.log(`current array: arr[${i}]`)
    observer.next(arr[i])
  }
  console.log('BEFORE complete')
  observer.complete()
  console.log('bservable END')
})

function logAndGet(original: number, value: number) {
  console.log(`original: ${original}, map value: ${value}`)
  return value
}

observableCreated$.pipe(
  map((value: number) => logAndGet(value, value * 2)),
  map((value: number) => logAndGet(value, value + 2)),
  map((value: number) => logAndGet(value, value * 3)),
  toArray()
).subscribe((arr) => console.log(arr))
