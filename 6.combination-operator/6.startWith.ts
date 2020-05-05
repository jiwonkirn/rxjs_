// startWith

/**
 * startWith 연산자는 구독하는 어떤 옵저버블이 특정 값을 발행하기 전 미리 나열한 인자를 발행하는 역할을 한다.
 */

import { interval, range } from 'rxjs'
import { take, startWith, scan } from 'rxjs/operators'

interval(1000)
  .pipe(take(5), startWith('대기 중... 구독됨... Waiting... subscribed.'))
  .subscribe(v => console.log(v))

/**
  result:
  1초가 지날 때까지는 값을 발행하지 않으므로
  startWith 연산자를 사용해 옵저버블을 미리 구독한다는 문구를 출력하는 예제이다.

  대기 중... 구독됨... Waiting... subscribed.
  0
  1
  2
  3
  4
 */

// startWith 연산자로 여래개의 연속 값을 먼저 발행하기
range(4, 3)
  .pipe(
    startWith(1, 2, 3),
    scan((x, y) => x + y),
  )
  .subscribe(sum => console.log(`range(4, 3).startWith(1, 2, 3) sum: ${sum}`))

range(4, 3)
  .pipe(scan((x, y) => x + y))
  .subscribe(sum => console.log(`range(4, 3) sum: ${sum}`))
/**
  result:
  소스 옵저버블에서 값을 발행하기 전 startWith의 ...args들을 먼저 발행한다.

  range(4, 3).startWith(1, 2, 3) sum: 1
  range(4, 3).startWith(1, 2, 3) sum: 3
  range(4, 3).startWith(1, 2, 3) sum: 6
  range(4, 3).startWith(1, 2, 3) sum: 10
  range(4, 3).startWith(1, 2, 3) sum: 15
  range(4, 3).startWith(1, 2, 3) sum: 21
  range(4, 3) sum: 4
  range(4, 3) sum: 9
  range(4, 3) sum: 15
 */
