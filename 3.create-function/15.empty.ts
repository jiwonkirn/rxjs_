import { empty, EMPTY } from 'rxjs'

empty().subscribe(
  x => console.log(`next: ${x}`),
  error => console.log(`error.message: ${error.message}`),
  () => console.log('completed')
)

/**
  completed
*/

// 상수로도 가능
EMPTY.subscribe(
  x => console.log(`next: ${x}2`),
  error => console.log(`error.message: ${error.message}22`),
  () => console.log('completed2')
)

/**
  completed2
*/
