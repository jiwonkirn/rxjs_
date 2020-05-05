// reduce

/**
 * reduce 연산자는 누적자 함수(accumulator)를 이용해 소스 옵저버블에서 발행한 값을 누적한다.
 * 소스 옵저버블에서 complete 함수를 호출하면 지금까지 누적한 결과를 next함수로 발행하고 완료한다.
 * scan 연산자와 비슷한 역할을 하지만 소스 옵저버블에서 값을 발행할 때마다 매번 누적한 결과를 리턴하지 않는다는 점에서 다르다.
 * scan 연산자와 마찬가지로 seed(초깃값)을 두번째 인자로 받는다.
 */

import { of, range } from 'rxjs'
import { reduce } from 'rxjs/operators'

// 초깃값이 없는 경우
// 초깃값이 없는 경우는 처음 발행하는 값을 초깃값으로 삼고 누적자함수를 적용하지 않는다.

of(0)
  .pipe(reduce((acc, cur) => acc + cur))
  .subscribe(res => console.log(res))

/**
  result:

  0
 */

range(1, 4)
  .pipe(reduce((acc, cur) => acc + cur))
  .subscribe(res => console.log(res))

/**
  result:
  1. 소스 옵저버블 1 -> 누적값 1 저장 <- 초깃값이 없으므로 누적자 함수를 호출하지 않는다.
  2. 소스 옵저버블 2 -> 누적자 함수 호출, acc = 1, cur = 2, 1+2=3
  3. 소스 옵저버블 3 -> 누적자 함수 호출, acc = 3, cur = 3, 3+3=6
  4. 소스 옵저버블 4 -> 누적자 함수 호출, acc = 6, cur = 4, 6+4=10
  5. complete -> 누적갑 10 발행 후 구독완료(next(10).complete)

  10
 */
/**
 * 누적자 함수는 index를 세번째 parameter로 가지는데,
 * 초깃값이 없을 경우 두번째 값을 발행하는 순서부터 누적자 함수를 호출하므로 첫 index는 1이다.
 */

// 초깃값이 있는 경우
// 초깃값이 있는 경우는 초깃값과 소스 옵저버블에서 발행한 값을 가지고 누적자 함수를 호출한다.
of(0)
  .pipe(reduce((acc, cur) => acc + cur, 1))
  .subscribe(res => console.log(res))
/**
 result:

 1
 */

range(1, 4)
  .pipe(reduce((acc, cur) => acc + cur, 1))
  .subscribe(res => console.log(res))
/**
  result:
  0. 초깃값 1 -> acc = 1
  1. 소스 옵저버블 1 -> 누적자 함수 호출, acc = 1, cur = 1, 1+1=2
  2. 소스 옵저버블 2 -> 누적자 함수 호출, acc = 2, cur = 2, 2+2=4
  3. 소스 옵저버블 3 -> 누적자 함수 호출, acc = 4, cur = 3, 4+3=7
  4. 소스 옵저버블 4 -> 누적자 함수 호출, acc = 7, cur = 4, 7+4=11
  5. complete -> 누적갑 11 발행 후 구독완료(next(11).complete)

  11
 */
