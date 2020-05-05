// min

/**
 * min 연산자는 max 연산자와 반대조건으로 값을 비교해 reduce 연산자에 가장 작은 값을 누적한 누적자 함숫값을 전달한다.
 * max 연산자와 구현이 비슷하므로 설명은 달지 않는다.
 */

import { from, range } from 'rxjs'
import { min } from 'rxjs/operators'

range(1, 10).pipe(min()).subscribe(console.log)
/**
  result:

  1
 */

const movies = [
  { title: 'movie1', avg: 5.12 },
  { title: 'movie2', avg: 9.14 },
  { title: 'movie3', avg: 8.28 },
]

from(movies)
  .pipe(min((x, y) => x.avg - y.avg))
  .subscribe(v => console.log(JSON.stringify(v)))
/**
  result:

  {"title":"movie1","avg":5.12}
 */

const movies2 = [
  { title: 'movie1', avg: 5.12 },
  { title: 'movie2', avg: 5.12 },
  { title: 'movie3', avg: 9.14 },
]

from(movies2)
  .pipe(min((x, y) => x.avg - y.avg))
  .subscribe(v => console.log(JSON.stringify(v)))
/**
  result:

  {"title":"movie2","avg":5.12}
 */
