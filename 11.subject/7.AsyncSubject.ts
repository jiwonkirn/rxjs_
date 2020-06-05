// AsyncSubject

/**
 * AsyncSubject는 비동기로 실행한 동작이 완료돠면 마지막 결과를 받는 역할을 한다.
 * 즉 AsyncSubject로 비동기 동작을 실행한 후 complete 함수를 호출하기 직전에 비동기 연산의 마지막 결과를 전달하야 한다.
 *
 * 비동기 실행 결과를 모아 구독완료 후 마지막 값을 리턴한다는 점에서 forkJoin 함수와 비슷하다.
 */

import { interval, AsyncSubject } from 'rxjs'
import { take, scan, pluck, tap } from 'rxjs/operators'

const asyncSubject = new AsyncSubject()

const period = 500
const lastN = 8

const fibonacci = n =>
  interval(period).pipe(
    take(n),
    scan<any>(
      (acc, index) =>
        acc
          ? {
              a: acc.b,
              b: acc.a + acc.b,
            }
          : { a: 0, b: 1 },
      null,
    ),
    pluck('a'),
    tap(n => console.log(`tap log: emitting ${n}`)),
  )

fibonacci(lastN).subscribe(asyncSubject)

asyncSubject.subscribe(result => console.log(`1st subscribe: ${result}`))

setTimeout(() => {
  console.log('try 2nd subscribe')
  asyncSubject.subscribe(result => console.log(`2nd subscribe: ${result}`))
}, period * lastN)

/**
  result:
  첫번째 구독때는 마지막 값을 기다렸다가 마지막 값을 발행하면 출력하고
  두번째 구독때는 이미 존재하는(발행돤 적이 있는) 마지막 값을 발행한다.

  tap log: emitting 0
  tap log: emitting 1
  tap log: emitting 1
  tap log: emitting 2
  tap log: emitting 3
  tap log: emitting 5
  tap log: emitting 8
  try 2nd subscribe
  tap log: emitting 13
  1st subscribe: 13
  2nd subscribe: 13
 */
