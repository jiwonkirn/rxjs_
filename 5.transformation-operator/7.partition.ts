// partition

/**
 * partition 연산자는 filter 연산자처럼 predicate 함수를 호출하면 2개의 옵저버블을 배열로 리턴한다.
 * 배열의 첫 요소는 predicate 함수의 조건을 만족하는 filter연산자를 적용한 옵저버블이, 다른 요소는 조건을 만족하지 않는 옵저버블이 리턴된다.
 * > thisArg는 predicate에서 리턴한 값을 확인한다.
 *
 * partition 연산자는 옵저버블 하나만 리턴하는 연산자롸 달리 연산자 사용 후 바로 다른 연산자를 붙이거나 구독할 수 없다.
 * 2개의 옵저버블 배열을 발행하는 옵저버블을 리턴하는 것이 아니라 배열 자체를 리턴하기 때문에 배열에서 옵저버블을 꺼내서 처리해주어야 한다.
 */

import { interval } from 'rxjs'
import { partition, take, map } from 'rxjs/operators'

const [winSource$, loseSource$] = partition(x => Math.random() < 0.7)(interval(500))

winSource$
  .pipe(
    map(x => `당첨!! (${x})`),
    take(10),
  )
  .subscribe(res => console.log(res))

loseSource$
  .pipe(
    map(x => `꽝!! (${x})`),
    take(10),
  )
  .subscribe(res => console.log(res))
/**
  result:
  소스 옵저버블을 각각 구독하므로 어떨땐 같은 숫자가 나오고 어떨땐 숫자가 출력되지 않는다.
  take(10)으로 10개를 먼저 발행한 당첨!!은 구독이 완료된다.

  당첨!! (0)
  당첨!! (2)
  꽝!! (2)
  당첨!! (3)
  당첨!! (4)
  꽝!! (4)
  당첨!! (5)
  꽝!! (5)
  당첨!! (7)
  꽝!! (7)
  당첨!! (10)
  당첨!! (11)
  꽝!! (11)
  당첨!! (12)
  당첨!! (13)
  꽝!! (13)
  꽝!! (17)
  꽝!! (21)
  꽝!! (22)
  꽝!! (24)
 */
