// 서브젝트의 특성

/**
 * 지금까지 학습한 옵저버블은 subscribe 함수를 호출하는 시점에 여러 옵저버를 등록하지 않으므로 멀팈캐스팅을 지원하지 않는다.
 * 이를 콜드 옵저버블이라고 한다.
 *
 * 서브젝트는 멀티캐스팅을 지원하기 위해 옵저버이면서 옵저버블인 특성이 있다.
 * 콜드 옵저버블과 달리 옵저버블의 특성이 있어 subscribe 함수를 호출했을 때 옵저버를 등록한다.
 * 이렇게 등록된 옵저버블은 서브젝트가 보내는 값이나 이벤트, 에러, 구독완료 등의 정보를 받을 수 있다.
 */

import { Subject } from 'rxjs'

const subject = new Subject()

const observerA = {
  next: x => console.log(`observerA: ${x}`),
  error: e => console.error(`observerA: ${e}`),
  complete: () => console.error(`observerA: complete`),
}

const observerB = {
  next: x => console.log(`observerB: ${x}`),
  error: e => console.error(`observerB: ${e}`),
  complete: () => console.error(`observerB: complete`),
}

const observerC = {
  next: x => console.log(`observerC: ${x}`),
  error: e => console.error(`observerC: ${e}`),
  complete: () => console.error(`observerC: complete`),
}

subject.subscribe(observerA)
subject.subscribe(observerB)
subject.subscribe(observerC)

subject.next(1)
subject.next(2)
subject.next(3)
subject.error(new Error('error!'))
subject.next(4)
subject.complete()

/**
  result:

  observerA: 1
  observerB: 1
  observerC: 1
  observerA: 2
  observerB: 2
  observerC: 2
  observerA: 3
  observerB: 3
  observerC: 3

  error를 먼저 호출한 경우
  observerA: Error: error!
  observerB: Error: error!
  observerC: Error: error!

  complete를 먼저 호출한 경우
  observerA: complete
  observerB: complete
  observerC: complete
 */
