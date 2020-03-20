import { range } from 'rxjs'
import { first } from 'rxjs/operators'

// predicate callback의 반환값이 truthy인 값만 발행한 후 구독 종료
range(1, 10).pipe(
  first(v => v > 5)
).subscribe(
  (v) => console.log(`next: ${v}`),
  (error) => console.log(`error.message: ${error.message}`),
  () => console.log(`complete`),
)

/**
  next: 6
  complete
*/

console.log('\n')

// predicate callback이 없으면 첫번째 값만 발행한 뒤 종료
range(1, 10).pipe(
  first()
).subscribe(
  (v) => console.log(`next: ${v}`),
  (error) => console.log(`error.message: ${error.message}`),
  () => console.log(`complete`),
)

/**
  next: 1
  complete
*/

console.log('\n')

// 만족하는 값이 없으면 error를 뱉는다.
range(1, 10).pipe(
  first(v => v > 10)
).subscribe(
  (v) => console.log(`next: ${v}`),
  (error) => console.log(`error.message: ${error.message}`),
  () => console.log(`complete`),
)

/**
  error.message: no elements in sequence
*/

console.log('\n')

// 두번째 인자는 만족하는 값이 없을 경우 방출하는 defaultValue
range(1, 10).pipe(
  first(v => v > 10, 15)
).subscribe(
  (v) => console.log(`next: ${v}`),
  (error) => console.log(`error.message: ${error.message}`),
  () => console.log(`complete`),
)

/**
  next: 15
  complete
*/