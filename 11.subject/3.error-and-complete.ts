// 서브젝트의 에러와 완료 처리

/**
 * 옵저버가 error와 complete 함수를 호출한 후 서브젝트를 구독하면 어떤현상이 있는지 살펴보자.
 */

import { Subject } from 'rxjs'
const subject = new Subject()

const observerA = {
  next: x => console.log(`observerA: ${x}`),
  error: e => console.error(`observerA Error: ${e}`),
  complete: () => console.log(`observerA Complete`),
}
const observerB = {
  next: x => console.log(`observerB: ${x}`),
  error: e => console.error(`observerB Error: ${e}`),
  complete: () => console.log(`observerB Complete`),
}
const observerC = {
  next: x => console.log(`observerC: ${x}`),
  error: e => console.error(`observerC Error: ${e}`),
  complete: () => console.log(`observerC Complete`),
}

subject.error('error')
subject.subscribe(observerA)
subject.subscribe(observerB)
/**
  result:

  observerA Error: error
  observerB Error: error
 */

const subject2 = new Subject()

subject2.complete()
subject2.subscribe(observerA)
subject2.subscribe(observerB)
/**
  result:

  observerA Complete
  observerB Complete
 */

/**
 * 서브젝트는 unsubscribe 함수도 제공한다. unsubscribe 함수를 호출하면 아무 일도 일어나지 않은 것 같지만
 * 이후 모든 옵저버를 대상으로 멀티캐스팅을 할 수 없다.
 *
 * next error, complete 함수를 호출하면 에러가 발생하고 멀티캐스팅하려고 특정 몹저버가 구독을 시도해도 에러가 발생한다.
 * 이는 등록된 옵저버가 있는 배열을 null로 만들며, 더 사용할 수 없는 서브젝트 취급해 closed 플래그를 true로 인식해 애러가 발생하는 것이다.
 */

const subject3 = new Subject()

subject3.subscribe(observerA)
subject3.subscribe(observerB)

subject3.unsubscribe()

// subject 구독 해제 후 다시 구독한다.
subject3.subscribe(observerC)

// 하나씩만 주석 처리를 해제한 후 코드를 실행한다.
subject3.next(1)
subject3.error('error')
subject3.complete()
/**
  result:

  (node:4484) UnhandledPromiseRejectionWarning
  (node:4484) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
  (node:4484) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
 */
