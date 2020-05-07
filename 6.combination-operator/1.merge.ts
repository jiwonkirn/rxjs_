// merge

/**
 * 변환 연산자에서 소개한 mergeMap과 비슷하다. 다른점이 있다면 하나의 옵저버블로 만든다는 것이다.
 * mergeMap 연산자가 project 함수에서 리턴하는 옵저버블을 각각 함께 구독하는 것처럼
 * 인자로 나열된 각각의 옵저버블을 함께 구독하며 배열, 스케줄러, 숫자타입을 사용한다.
 * 발행은 먼저 발행된 값부터 발행한다.
 */

import { timer, merge } from 'rxjs'
import { map, take } from 'rxjs/operators'

const req1$ = timer(Math.floor(Math.random() * 2000)).pipe(map(value => 'req1'))
const req2$ = timer(Math.floor(Math.random() * 1000)).pipe(map(value => 'req2'))
const req3$ = timer(Math.floor(Math.random() * 1500)).pipe(map(value => 'req3'))

merge(req1$, req2$, req3$).subscribe(req => console.log(`response from ${req}`))

/**
  result:
  시간이 랜덤이지만 먼저 발행한 값부터 발행한다.

  response from req3
  response from req2
  response from req1
 */

// 동시에 구독하는 옵저버블 수 정하기
/**
 * merge 연산자는 동시에 구독하는 옵저버블 수를 정할 수 있다. 옵저버블만 인자로 나열할 때는 무한한 수를 동시에 구독한다.
 * 옵저버블을 나열하고 마지막에 number type의 값을 설정하면 해당 수만큼 동시에 구독한다. (concurrent)
 * 최대 동시 구독 개수인 concurrent에 도달하면 나머지 옵저버블은 인자로 나열된 순서대로 배열(큐)에 저장한다.
 * (엄밀히 동시에는 아니지만 함께 구독한다.)
 */

const req11$ = timer(0, 200).pipe(
  map(v => `req11: ${v}`),
  take(6),
)
const req12$ = timer(0, 500).pipe(
  map(v => `req12: ${v}`),
  take(11),
)
const req13$ = timer(0, 300).pipe(
  map(v => `req13: ${v}`),
  take(7),
)
const req14$ = timer(0, 500).pipe(
  map(v => `req14: ${v}`),
  take(9),
)
const req15$ = timer(0, 100).pipe(
  map(v => `req15: ${v}`),
  take(8),
)
const req16$ = timer(0, 700).pipe(
  map(v => `req16: ${v}`),
  take(4),
)
const concurrent = 2

merge(req11$, req12$, req13$, req14$, req15$, req16$, concurrent).subscribe(res => console.log(`response from ${res}`))

/**
  result:
  동시의 2개의 옵저버블만 병렬적으로 구독한다.

  ------------------------- req11, req12
  response from req11: 0
  response from req12: 0
  response from req11: 1
  response from req11: 2
  response from req12: 1
  response from req11: 3
  response from req11: 4
  response from req11: 5

  ------------------------- req13, req12
  response from req13: 0
  response from req12: 2
  response from req13: 1
  response from req12: 3
  response from req13: 2
  response from req13: 3
  response from req12: 4
  response from req13: 4
  response from req12: 5
  response from req13: 5
  response from req13: 6

  ------------------------- req14, req12
  response from req14: 0
  response from req12: 6
  response from req14: 1
  response from req12: 7
  response from req14: 2
  response from req12: 8
  response from req14: 3
  response from req12: 9
  response from req14: 4
  response from req12: 10

  ------------------------- req14, req15
  response from req15: 0
  response from req15: 1
  response from req15: 2
  response from req15: 3
  response from req14: 5
  response from req15: 4
  response from req15: 5
  response from req15: 6
  response from req15: 7

  ------------------------- req14, req16
  response from req16: 0
  response from req14: 6
  response from req14: 7
  response from req16: 1
  response from req14: 8

  ------------------------- req16
  response from req16: 2
  response from req16: 3
 */
