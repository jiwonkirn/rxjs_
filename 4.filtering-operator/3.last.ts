import { range } from 'rxjs'
import { last } from 'rxjs/operators'

// last 연산자는 마지막 값 1개만 발행하는 연산자다. 
// next함수로 호출된 값들을 저장하다가 complete 함수를 호출할 때 마지막에 저장된 값을반환된다.
// 주의할 점은 complete함수를 호출하지 않는 소스 옵져버블을 사용할때 (interval)
// 영원히 값을 발행하지 않고 소스 옵져버블만 계속 동작하는 무한루프에 빠진다.
// 따라서 complete 함수를 호출하는 것이 보장된 경우에만 사용한다.

// 1. callback인자가 없는 경우
range(1, 10).pipe(
  last()
).subscribe(
  v => console.log(`next: ${v}`),
  error => console.log(`error message: ${error.message}`),
  () => console.log('complete')
)

/**
  next: 10
  complete
*/


// 2. callback 인자가 있고 참을 반환하는 case가 있는 경우
range(1, 10).pipe(
  last(v => v >= 5)
).subscribe(
  v => console.log(`next: ${v}`),
  error => console.log(`error message: ${error.message}`),
  () => console.log('complete')
)

/**
  next: 10
  complete 
*/


// 3. callback 인자가 있고 참을 반환하는 case가 없는경우
range(1, 10).pipe(
  last(v => v >= 11)
).subscribe(
  v => console.log(`next: ${v}`),
  error => console.log(`error message: ${error.message}`),
  () => console.log('complete')
)

/**
  error message: no elements in sequence
*/


// 4. callback 인자가 있고 참을 반환하는 case가 없고, defaultValue가 있는 경우
range(1, 10).pipe(
  last(v => v >= 11, 15)
).subscribe(
  v => console.log(`next: ${v}`),
  error => console.log(`error message: ${error.message}`),
  () => console.log('complete')
)

/**
  next: 15
  complete
*/
