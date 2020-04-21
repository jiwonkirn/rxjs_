// concatMap

/**
 * concatMap 연산자는 project에서 반환한 옵저버블에 대한 구독이 완료되면
 * 버퍼에서 대기하고 있던 소스 옵저버블의 발행값을 받아 다음 project 함수의 옵저버블을 구독한다.
 * 이는 값 발행과 관련지어 순서를 보장한다.
 * concatMap의 구현 코드는 mergeMap에서 concurrency를 1로 설정한 동작을 추상화한 연산자이다.
 */
import { timer, interval, range } from 'rxjs'
import { map, take, concatMap, startWith, tap, skip } from 'rxjs/operators'

const requests = [
  timer(2000).pipe(map(v => 'req1')),
  timer(1000).pipe(map(v => 'req2')),
  timer(1500).pipe(map(v => 'req3')),
]

interval(1000)
  .pipe(take(5))
  .subscribe(v => console.log(`${v + 1} secs`))

range(0, 3)
  .pipe(concatMap(x => requests[x]))
  .subscribe(req => console.log(`response from ${req}`))

/**
  result: 모든 옵저버블들이 소스 옵저버블의 발행 순서에 따라 순차적으로 완료된다.
  비동기 작업이면서 소스 옵저버블의 발행 속도가 더 빠른 경우 버퍼가 차 메모리가 필요하다는 점을 주의해야한다.

  1 secs
  response from req1
  2 secs
  response from req2
  3 secs
  4 secs
  response from req3
  5 secs
 */

const FIRST_VALUE = -1
const requests2 = [
  timer(2000).pipe(
    startWith(FIRST_VALUE),
    tap(x => x === FIRST_VALUE && console.log(`req1 subscribed`)),
    skip(1),
    map(value => 'req1'),
  ),
  timer(1000).pipe(
    startWith(FIRST_VALUE),
    tap(x => x === FIRST_VALUE && console.log(`req2 subscribed`)),
    skip(1),
    map(value => 'req2'),
  ),
  timer(1500).pipe(
    startWith(FIRST_VALUE),
    tap(x => x === FIRST_VALUE && console.log(`req3 subscribed`)),
    skip(1),
    map(value => 'req3'),
  ),
]

interval(1000)
  .pipe(take(5))
  .subscribe(x => console.log(`${x + 1} secs`))

range(0, 3)
  .pipe(
    tap(x => console.log(`range next ${x}`)),
    concatMap(x => {
      console.log(`begin concatMap project function ${x}`)
      return requests2[x]
    }),
  )
  .subscribe(req => console.log(`response from ${req}`))

/**
  result:

  range next 0
  begin concatMap project function 0
  req1 subscribed
  range next 1 -> 소스 옵저버블에서 발행된 값. 버퍼에 저장
  range next 2 -> 소스 옵저버블에서 발행된 값. 버퍼에 저장
  1 secs
  response from req1
  begin concatMap project function 1 -> 버퍼에 있던 값 1을 받아 project함수 실행, 옵저버블 구독
  req2 subscribed
  2 secs
  response from req2
  begin concatMap project function 2 -> 버퍼에 있던 값 2을 받아 project함수 실행, 옵저버블 구독
  req3 subscribed
  3 secs
  4 secs
  response from req3
  5 secs
 */
