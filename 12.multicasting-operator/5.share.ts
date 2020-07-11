// share 연산자

/**
 * share는 pipe(publish(), refCount())를 추상화한 연산자이다.
 * 하지만 동작은 다르다.
 * share는 (source) => refCount()(multicast(shareSubjectFactory)(source)) 를 리턴하기 때문에
 * refCount 연산자가 발행한 값이 0이 된 이후 재구독을 하더라도 새로운 값을 전달받을 수 있다.
 */

import { interval } from 'rxjs'
import { take, tap, publish, refCount, share } from 'rxjs/operators'

const testSource$ = interval(500).pipe(
  take(5),
  tap(x => console.log(`tap ${x}`)),
  share(),
  // publish(),
  // refCount(),
)

const a = testSource$.subscribe(x => console.log(`a: ${x}`))
const b = testSource$.subscribe(x => console.log(`b: ${x}`))

setTimeout(() => {
  console.log('timeout')
  testSource$.subscribe(x => console.log(`c: ${x}`))
}, 3000)

/**
  result:

  tap 0
  a: 0
  b: 0
  tap 1
  a: 1
  b: 1
  tap 2
  a: 2
  b: 2
  tap 3
  a: 3
  b: 3
  tap 4
  a: 4
  b: 4
  timeout
  tap 0
  c: 0
  tap 1
  c: 1
  tap 2
  c: 2
  tap 3
  c: 3
  tap 4
  c: 4
 */
