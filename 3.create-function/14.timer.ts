import { timer } from 'rxjs'

timer(1000).subscribe(
  x => console.log(`timer(1000) next: ${x}`),
  error => console.log(`error.message: ${error.message}`),
  () => console.log('complete')
)

/**
  timer(1000) next: 0
  complete
*/

// 첫번째는 timeout, 두번째는 interval
timer(3000, 1000).subscribe(
  x => console.log(`timer(3000, 1000) next: ${x}`),
  error => console.log(`error.message: ${error.message}`),
  () => console.log('complete')
)

/**
  timer(3000, 1000) next: 0
  timer(3000, 1000) next: 1
  timer(3000, 1000) next: 2
  timer(3000, 1000) next: 3
  timer(3000, 1000) next: 4
  timer(3000, 1000) next: 5
*/
