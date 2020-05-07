// map 연산자

/**
 * map 연산자는 project라는 선택자 함수를 인자로 사용해 옵저버블에서 발행하는 값에 적용한다.
 * 즉 map 연산자를 사용한 옵저버블이 발행하는 값 각각은 소스 옵저버블에서 발행한 값 각각에 project 함수를 적용한 결과다.
 *
 * lodash나 array#extras 같은 라이브러리에도 map같은 함수형 연산자가 존재하는데,
 * 이 라이브러리들은 연산자를 호출하는 순간 모든 배열을 순회하며 새 배열을 만든다.
 * 하지만 rxjs의 map은 소스 옵저버블을 map연산자로 동작하는 새 옵저버블로 바꾸고 이를 구독할 때 각각의 값을 발행한다.
 */

import { from, range } from 'rxjs'
import { map } from 'rxjs/operators'

const source$ = from([1, 2, 3, 4, 5])
const resultSource$ = source$.pipe(
  map(x => x + 1),
  map(x => x * 2),
)

resultSource$.subscribe(v => console.log(v))

/**
  result:
  4
  6
  8
  10
  12
*/

/**
 * Array.prototype.map은 모든 배열을 순회하고 새 배열을 반환한다면,
 * rxjs map 연산자는 map 연산자를 수행할 때마다 새 옵저버블의 값 각각을 바로 발행하므로 실행결과를 더 빠르게 확인할 수 있다.
 */
const source2$ = range(0, 5).pipe(map(x => ({ x, isEven: x % 2 === 0 })))

source2$.subscribe(v => console.log(`${v.x}는 ${v.isEven ? '짝수' : '홀수'}입니다.`))
/**
  result:
  0는 짝수입니다.
  1는 홀수입니다.
  2는 짝수입니다.
  3는 홀수입니다.
  4는 짝수입니다.
*/
