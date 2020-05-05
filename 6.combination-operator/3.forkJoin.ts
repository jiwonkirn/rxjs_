// forkJoin (함수)

/**
 * concat 연산자는 옵저버블의 구독 순서를 보장하지만 각 옵저버블을 동시에 구독할 수 없으므로 동시성 보장을 할 수 없다.
 * forkJoin은 연산자는 아니지만 동시성을 보장하면서 순서를 보장할 수 있는 함수이다.
 * 이는 Promise.all과 비슷하게 동작한다.
 * forkJoin 함수는 merge 연산자처럼 모든 옵저버블을 동시에 구독한 후 각 옵저버블이 마지막에 발행한 값을 배열에 저장한다.
 * 즉 모든 옵저버블이 구독을 완료해야 구독을 완료할 수 있는 옵저버블을 만든다.
 */

import { timer, forkJoin } from 'rxjs'
import { take, map } from 'rxjs/operators'

const req1$ = timer(0, 2000).pipe(
  take(2),
  map(v => `req1 result: ${v}`),
)
const req2$ = timer(0, 1000).pipe(
  take(2),
  map(v => `req2 result: ${v}`),
)
const req3$ = timer(0, 1500).pipe(
  take(2),
  map(v => `req3 result: ${v}`),
)

console.time('forkJoin example time')

forkJoin(req1$, req2$, req3$).subscribe(res => {
  console.timeEnd('forkJoin example time')
  console.log('== forkJoin req1$, req2$, req3$ result ==')
  console.log(`result: ${res}`)
  console.log(`result is array: ${Array.isArray(res)}`)
  Array.isArray(res) && console.log(`result length: ${res.length}`)
})
/**
  result:
  마지막 구독을 완료하는 req1$ 옵저버블이 2000ms
  2000ms 이후 각 옵저버블의 마지막 값을 저장한 배열을 반환.

  forkJoin example time: 2002.960ms
  == forkJoin req1$, req2$, req3$ result ==
  result: req1 result: 1,req2 result: 1,req3 result: 1
  result is array: true
  result length: 3
 */

/**
 * forkJoin 함수의 경우 다음 시나리오에서 완벽하게 동작하지 않는다.
 *
 * 옵저버블 실행 순서가 req2 -> req1 -> req3
 * req2의 구독이 완료되어 마지막 결과를 forkJoin 함수로 저장하다가 req1 옵저버블 구독 완료
 * req3 옵저버블은 구독하기전이라면 req1, req2만 발행됨
 *
 * 때문에 사용자 정의 연산자를 활용할 수 있다. (뒤에 학습)
 */
