// tap

/**
 * tap은 부수효과가 필요할 때 사용하는 연산자이다. (5버전엔 do)
 * 보통의 연산자들은 순수함수였다.
 * 예를 들어 map 연산자는 인자로 사용하는 함수를 소스 옵저버블의 값을 다른 값으로 바꿔서 발행하는 옵저버블로 변경한다.
 * 그러나 tap 연산자는 소스 옵저버블을 다른 옵저버블로 바꾸지 않는다.
 * 그저 소스 옵저버블에서 발행하는 값을 전달받은 후 인자로 사용하는 함수를 호출한 뒤 소스 옵저버블이 발행항 값 그대로 발행한다.
 *
 * - 보통 로그 출력이나 file I/O 등의 부수 효과를 수행한다.
 * - tap의 첫번째 parameter는 함수 혹은 next, error, complete 함수가 있는 옵저버 객체를 다룬다.
 */

import { range, concat } from 'rxjs'
import { tap, filter, map } from 'rxjs/operators'

// next 콜백 사용
range(1, 10)
  .pipe(
    tap(x => console.log(`Stream 1 (range 1, 10) ${x}`)),
    filter(x => x % 2 === 0),
    tap(x => console.log(`  Stream 2 (filter x % 2 === 0) ${x}`)),
    map(x => x + 1),
    tap(x => console.log(`    Stream 3 (map x + 1) ${x}`)),
  )
  .subscribe(x => console.log(`      result: ${x}`))
/**
  result:

  Stream 1 (range 1, 10) 1
  Stream 1 (range 1, 10) 2
    Stream 2 (filter x % 2 === 0) 2
      Stream 3 (map x + 1) 3
        result: 3
  Stream 1 (range 1, 10) 3
  Stream 1 (range 1, 10) 4
    Stream 2 (filter x % 2 === 0) 4
      Stream 3 (map x + 1) 5
        result: 5
  Stream 1 (range 1, 10) 5
  Stream 1 (range 1, 10) 6
    Stream 2 (filter x % 2 === 0) 6
      Stream 3 (map x + 1) 7
        result: 7
  Stream 1 (range 1, 10) 7
  Stream 1 (range 1, 10) 8
    Stream 2 (filter x % 2 === 0) 8
      Stream 3 (map x + 1) 9
        result: 9
  Stream 1 (range 1, 10) 9
  Stream 1 (range 1, 10) 10
    Stream 2 (filter x % 2 === 0) 10
      Stream 3 (map x + 1) 11
        result: 11
 */

// error 콜백 함수 사용
range(1, 8)
  .pipe(
    map(x => {
      if (x === 8) {
        throw new Error('error!')
      }
      return x + 1
    }),
    tap(
      x => console.log(`tap next: ${x}`),
      err => console.error(`tap ERROR: ${err}`),
    ),
  )
  .subscribe(
    x => console.log(`result: ${x}`),
    err => console.error(`subscribe ERROR: ${err}`),
  )
/**
  result:
  subscribe로 error message를 출력하기 전에 먼저 출력할 수 있다.

  tap next: 2
  result: 2
  tap next: 3
  result: 3
  tap next: 4
  result: 4
  tap next: 5
  result: 5
  tap next: 6
  result: 6
  tap next: 7
  result: 7
  tap next: 8
  result: 8
  tap ERROR: Error: error!
  subscribe ERROR: Error: error!
 */

// complete 콜백 함수 사용
concat(
  range(1, 4).pipe(
    tap(
      x => console.log(`tap next: ${x} STREAM 1`),
      err => console.error(`tap ERROR: ${err} STREAM 1`),
      () => console.log(`complete STREAM 1`),
    ),
  ),
  range(5, 3).pipe(
    tap(
      x => console.log(`tap next: ${x} STREAM 2`),
      err => console.error(`tap ERROR: ${err} STREAM 2`),
      () => console.log(`complete STREAM 2`),
    ),
  ),
).subscribe(
  x => console.log(`  result: ${x}`),
  err => console.error(`  subscribe ERROR: ${err}`),
  () => console.log(`  subscribe complete`),
)
/**
  result:

  tap next: 1 STREAM 1
    result: 1
  tap next: 2 STREAM 1
    result: 2
  tap next: 3 STREAM 1
    result: 3
  tap next: 4 STREAM 1
    result: 4
  complete STREAM 1
  tap next: 5 STREAM 2
    result: 5
  tap next: 6 STREAM 2
    result: 6
  tap next: 7 STREAM 2
    result: 7
  complete STREAM 2
    subscribe complete
 */

// 옵저버로 콜백 함수 묶어서 사용
const observer1 = {
  next: x => console.log(`tap next: ${x} STREAM 1`),
  error: err => console.error(`tap ERROR: ${err} STREAM 1`),
  complete: () => console.log(`complete STREAM 1`),
}

const observer2 = {
  next: x => console.log(`tap next: ${x} STREAM 2`),
  error: err => console.error(`tap ERROR: ${err} STREAM 2`),
  complete: () => console.log(`complete STREAM 2`),
}

concat(range(1, 4).pipe(tap(observer1)), range(5, 3).pipe(tap(observer2))).subscribe(
  x => console.log(`  result: ${x}`),
  err => console.error(`  subscribe ERROR: ${err}`),
  () => console.log(`  subscribe complete`),
)
/**
  result:
  next, error, complete 중 붚필요한 것을 제외해도 동작한다.

  tap next: 1 STREAM 1
    result: 1
  tap next: 2 STREAM 1
    result: 2
  tap next: 3 STREAM 1
    result: 3
  tap next: 4 STREAM 1
    result: 4
  complete STREAM 1
  tap next: 5 STREAM 2
    result: 5
  tap next: 6 STREAM 2
    result: 6
  tap next: 7 STREAM 2
    result: 7
  complete STREAM 2
    subscribe complete
 */
