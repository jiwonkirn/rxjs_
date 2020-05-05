// count

/**
 * count 연산자는 소스 옵저버블이 값을 발행할 때마다 개수를 내부에서 센다.
 * 구독을 완료한 후 총 몇개인지 발행한다.
 *
 * predicate 함수는 조건을 만족하는지 아닌지를 검사해 리턴한다.
 * 즉 조건을 만족할 때만 count를 한다.
 */

import { range } from 'rxjs'
import { count } from 'rxjs/operators'

range(1, 20).pipe(count()).subscribe(console.log)
/**
  result:

  20
 */

range(1, 20)
  .pipe(count(v => v % 2 === 0))
  .subscribe(console.log)
/**
  result:

  10
 */
