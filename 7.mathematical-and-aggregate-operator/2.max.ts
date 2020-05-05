// max

/**
 * max 연산자는 발행되는 값 중 가장 큰 값을 출력하는 연산자다.
 * reduce 연산자에 제일 큰 값을 누적한 누적자 함수의 값을 전달하는 방법으로 동작한다.
 *
 * max 연산자는 comparer 함수를 선택적으로 인자로 받을 수 있다.
 */

import { range, from } from 'rxjs'
import { max } from 'rxjs/operators'

// comparer를 받지 않는 경우
range(1, 10)
  .pipe(max())
  .subscribe(v => console.log(v))

/**
  result:

  10
 */

// comparer를 사용하는 경우
const movies = [
  { title: 'movie1', avg: 5.12 },
  { title: 'movie2', avg: 9.14 },
  { title: 'movie3', avg: 8.28 },
]

from(movies)
  .pipe(max((x, y) => x.avg - y.avg))
  .subscribe(v => console.log(JSON.stringify(v)))
/**
  result:

  {"title":"movie2","avg":9.14}
 */

// 다른 객체지만 같은 값으로 평가할 때의 max 연산자 사용
const movies2 = [
  { title: 'movie1', avg: 5.12 },
  { title: 'movie2', avg: 9.14 },
  { title: 'movie3', avg: 9.14 },
]

from(movies2)
  .pipe(max((x, y) => x.avg - y.avg))
  .subscribe(v => console.log(JSON.stringify(v)))

/**
  reult:
  max 연산자 내부 구현의 비교가 compare(x, y) > 0 ? x : y 이므로 나중에 오는 값이 최대값으로 취급되어 반환된다.

  {"title":"movie3","avg":9.14}
 */
