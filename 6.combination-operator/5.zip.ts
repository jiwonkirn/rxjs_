// zip

/**
 * zip 연산자는 각 옵저버블을 동시에 구독한 후 발행하는 값 각각을 버퍼에 저장한다.
 * 그리고 같은 순서에 해당하는 값이 모두 준비되었을 때 합한 값을 발행한다.
 * 다만 발행 속도가 너무 차이나면 메모리 이슈가 발생할 수 있다는 점에 주의해야 한다.
 *
 * zip 연산자 또한 project 함수를 활용할 수 있다.
 */

import { of, zip } from 'rxjs'

const fruits$ = of('orange', 'banana', 'kiwi')
const numbers$ = of(5, 3, 2, 10, 11)

zip(fruits$, numbers$, (fruit, number) => `${fruit} ${number}개`).subscribe(combination =>
  console.log(`${combination} 착즙`),
)

/**
  result:
  짝이 맞는 개수까지만 합해서 값을 발행하고 구독을 완료한다.

  orange 5개 착즙
  banana 3개 착즙
  kiwi 2개 착즙
 */
