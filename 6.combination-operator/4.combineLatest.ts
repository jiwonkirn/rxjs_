// combineLatest

/**
 * combineLatest 연산자는 forkJoin 함수화 비슷하다.
 * 단, 옵저버블 구독을 완료하기 전이라도 각 옵저버블의 가장 최신 값을 합해서 바로 발행한다.
 *
 * combineLatest 연산자도 함수를 인자로 사용할 수 있는데 이를 project 함수라고 한다.
 */

import { timer, combineLatest } from 'rxjs'
import { take } from 'rxjs/operators'

// const req1$ = timer(0, 400).pipe(take(6))
// const req2$ = timer(0, 300).pipe(take(10))
// const req3$ = timer(0, 500).pipe(take(7))

// combineLatest(req1$, req2$, req3$).subscribe(res => console.log(res))
/**
  result:
  처음 값이 모두 발행되어야 첫 실행결과를 출력한다.
  이후 하나라도 최신 값을 발행한다면 실행 값을 출력한다.

  [ 0, 0, 0 ]
  [ 0, 1, 0 ]
  [ 1, 1, 0 ]
  [ 1, 1, 1 ]
  [ 1, 2, 1 ]
  [ 2, 2, 1 ]
  [ 2, 3, 1 ]
  [ 2, 3, 2 ]
  [ 2, 4, 2 ]
  [ 3, 4, 2 ]
  [ 3, 4, 3 ]
  [ 3, 5, 3 ]
  [ 4, 5, 3 ]
  [ 4, 6, 3 ]
  [ 4, 6, 4 ]
  [ 5, 6, 4 ]
  [ 5, 7, 4 ]
  [ 5, 8, 4 ]
  [ 5, 8, 5 ]
  [ 5, 9, 5 ]
  [ 5, 9, 6 ]
 */

// project 함수를 사용하는 CASE
const req11$ = timer(0, 400).pipe(take(6))
const req12$ = timer(0, 300).pipe(take(10))
const req13$ = timer(0, 500).pipe(take(7))

combineLatest(req11$, req12$, req13$, (a, b, c) => `${a}, ${b}, ${c}`).subscribe(res => console.log(res))
/**
  result:
  project 함수가 리턴한 결과를 바로 발행한다.

  0, 0, 0
  0, 1, 0
  1, 1, 0
  1, 1, 1
  1, 2, 1
  2, 2, 1
  2, 3, 1
  2, 3, 2
  3, 3, 2
  3, 4, 2
  3, 5, 2
  3, 5, 3
  4, 5, 3
  4, 6, 3
  5, 6, 3
  5, 6, 4
  5, 7, 4
  5, 8, 4
  5, 8, 5
  5, 9, 5
  5, 9, 6
 */
