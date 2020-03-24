// 필요 없는 값을 발행하지 않는 연산자

/**
 * 특정 조건을 만족하는 값을 발행할 필요 없이 버려야 할 때가 있을때 사용되는 연산자들이다.
 */

import { interval } from 'rxjs'
import { skip, take, skipUntil, skipWhile } from 'rxjs/operators'

/**
 * skip
 * 인자로 넘겨준 값만큼 건너뛰고 그 다음 값부터 발행하는 연산자이다.
 * 
 * 아래 예제는
 * 0,1,2는 값이 발행되지 않고 그 이후부터 발행되므로 
 * 첫번째, 두번째 값인 3, 4가 발행되고 구독을 해제한다.
 */
interval(300).pipe(
  skip(3),
  take(2)
).subscribe(
  v => console.log(v),
  ({ message }) => console.log(`error.message: ${message}`),
  () => console.log('complete')
)

/** 
 * result:
 * 3
 * 4
 * complete
 */
 

/**
 * skipUntil
 * 인자로 넘겨준 Observable이 값을 발행하기 시작할 때 까지 값의 발행을 건너뛴다.
 */
interval(300).pipe(
  skipUntil(interval(1500)),
  take(3)
).subscribe(
  v => console.log(v),
  ({ message }) => console.log(`error.message: ${message}`),
  () => console.log('complete')
)

/** 
 * skipUntil의 인자로 들어온 옵져버블을 먼저 구독하고 그 다음에 interval(소스 옵져버블)을 구독한다.
 * 5배에 해당하는 시간을 먼저 구독 했기 때문에 값의 발행을 기다린 후 소스 옵져버블의 값을 발행한다.
 * 소스 옵져버블을 먼저 구독한다면 0, 1, 2를 발행하고 종료할 것이다.
 * 
 * result:
 * 4
 * 5
 * 6
 * complete
 */


/**
 * skipWhile
 * predicate callback이 참을 반환하는 동안 값의 발행을 건너뛴다.
 */
interval(300).pipe(
  skipWhile(v => v < 4),
  take(3)
).subscribe(
  v => console.log(v),
  ({ message }) => console.log(`error.message: ${message}`),
  () => console.log('complete')
)
/**
 * result:
 * 4
 * 5
 * 6
 * complete
 */