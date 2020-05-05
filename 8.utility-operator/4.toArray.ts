// toArray

/**
 * toArray는 옵저버블에서 발행한 값을 내부에 생성한 배열에 저장하다가
 * 소스 옵저버블 구독이 완료되면 해당 배열을 next 함수로 발행하도록 동작하는 연산자다.
 * (toPromise 함수와 이름은 비슷하지만 toArray는 연산자다.)
 *
 * 구독을 완료해햐한다는 점과 배열 크기에 따른 메모리 이슈가 있을 수 있음에 주의해야 한다.
 */

import { range } from 'rxjs'
import { filter, toArray } from 'rxjs/operators'

range(1, 30)
  .pipe(
    filter(x => x % 2 === 0),
    toArray(),
  )
  .subscribe(v => console.log(`isArray: ${Array.isArray(v)}, value: ${v}`))
/**
  result:

  isArray: true, value: 2,4,6,8,10,12,14,16,18,20,22,24,26,28,30
 */
