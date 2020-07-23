// subscribeOn 연산자

/**
 * subscribeOn 연산자는 구독하는 옵저버블 자체를 인자로 사용한 스케줄러로 바꿔준다.
 * 만약 여러개의 subscribeOn 연산자가 있다면 맨 처음 호출한 subscribeOn 연산자에 있는 스케줄러를 선택해 사용한다.
 * 그러므로 subscribeOn 연산자는 적절한 위치에 한번만 사용하면 된다.
 */

import { Observable, asyncScheduler } from 'rxjs'
import { subscribeOn } from 'rxjs/operators'

const source$ = Observable.create(observer => {
  console.log('BEGIN source')
  observer.next(1)
  observer.next(2)
  observer.next(3)
  observer.complete()
  console.log('END source')
})

console.log('before subscribe')
source$.pipe(subscribeOn(asyncScheduler, 1000)).subscribe(x => console.log(x))
console.log('after subscribe')
/**
  result:
  내부 구현은 스케줄러 안에서 구독 부분을 실행한다.
  scheduler.schedule(dispatch, deply, { source, subscriber })

  before subscribe
  after subscribe
  BEGIN source // 이전 라인 1초 뒤 실행
  1
  2
  3
  END source
 */
