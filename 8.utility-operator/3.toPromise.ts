// toPromise

/**
 * toPromise는 옵저버블에서 호출할 수 있지만 RxJS 연산자라기보다 유틸리티 함수라고 볼 수 있다.
 * 보통의 연산자는 새로운 옵저버블로 감싸서 리턴하고 이를 구독해서 해당 연산자를 동작시키는 연산자를 동작시킨다.
 * toPromise 함수는 호출하자마자 새로 생성한 프로미스를 리턴해준다.
 *
 * 또한 프로미스 안 함수에서 소스 옵저버블인 this를 사용해 구독하므로 프로미스 생성과 동시에 소스 옵저버블을 구독한다.
 * 그리고 toPromise 함수에서 리턴받은 프로미스는 소스 옵저버블 구독이 완료되었을 때 가장 최근 값을 resolve로 갖는다.
 * 즉 이 함수는 호출 즉시 소스 옵저버블을 구독하고 프로미스가 바로 리턴된다는 점에 주의해서 사용해야한다.
 */

import { interval, timer } from 'rxjs'
import { take, tap } from 'rxjs/operators'

interval(100)
  .pipe(
    take(10),
    tap(v => console.log(`interval tap ${v}`)),
  )
  .toPromise()
  .then(
    v => console.log(`result: ${v}`),
    reason => console.error(`error: ${reason}`),
  )
/**
  result:
  옵저버블을 구독한 적이 없는데 tap 연산자에서 출력하는 내용 그대로 동작한다.
  toPromise 함수를 호출할 때 프로미스를 생성하며 소스 옵저버블을 구독하므로
  100ms마다 0부터 1씩 증가하는 10개 숫자가 tap 연산자 안에서 출력된다.
  구독이 완료되면 발행한 값을 프로미스 결과로 리턴한다.

  interval tap 0
  interval tap 1
  interval tap 2
  interval tap 3
  interval tap 4
  interval tap 5
  interval tap 6
  interval tap 7
  interval tap 8
  interval tap 9
  result: 9
 */

// toPromise 함수의 reject 에러 처리
timer(1200, 100)
  .pipe(
    take(10),
    tap(x => {
      if (x < 3) {
        return console.log(`interval tap ${x}`)
      }
      throw new Error('x should not be more than 3')
    }),
  )
  .toPromise()
  .then(
    v => console.log(`result: ${v}`),
    reason => console.error(`error: ${reason}`),
  )
/**
  result:

  interval tap 0
  interval tap 1
  interval tap 2
  error: Error: x should not be more than 3
 */
