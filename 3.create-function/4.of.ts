import { of, asapScheduler } from 'rxjs'

console.log('Start')

// asapScheduler를 마지막 인자로 주어 비동기 처리를 하게끔 했다.
of(1, 2, 'a', 'b', ['arr1', 'arr2'], asapScheduler).subscribe(
  (v) => console.log(`next ${v}`),
  (error) => console.log(error),
  () => console.log('completed'),
)

console.log('End')
