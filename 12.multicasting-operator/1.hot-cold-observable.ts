// 핫 옵저버블과 콜드 옵저버블

/**
 * 핫 옵저버블
 * 핫 옵저버블은 옵저버블이 푸시하는 값을 여러 옵저버블에 멀티캐스탕 하는 옵저버블이다.
 * 서브젝트처럼 멀티캐스팅을 지원하지만 옵저버블이므로 next, error, complete 함수를 제공하지 않고 옵저버블 내부에서 멀티캐스팅할 값을 푸시한다.
 * 예를 들어 fromEvent 함수로 생성한 옵저버블은 핫 옵저버블이다. 이벤트가 발생할 때 구독하는 모든 옵저버로 값을 멀티캐스탕하기 때문이다.
 */

/**
 * 콜드 옵저버블은 멀티캐스팅을 지원하지 않는 옵저버블이다.
 * 여러 옵저버가 어떤 옵저버블을 구독하든 각 구독은 독립적으로 동작하며 옵저버블에서 푸시하는 값이 여러 옵저버에 공유되지 않는다.
 */

// 콜드 옵저버블의 예
import { interval, Subject } from 'rxjs'
import { take, tap } from 'rxjs/operators'

// const observerA = {
//   next: x => console.log(`observerA: ${x}`),
//   error: x => console.error(`observerA: ${x}`),
//   complete: () => console.log(`observerA: complete`),
// }

// const observerB = {
//   next: x => console.log(`observerB: ${x}`),
//   error: e => console.error(`observerB: ${e}`),
//   complete: () => console.log(`observerB: complete`),
// }

// const intervalSource$ = interval(500).pipe(take(5))
// intervalSource$.subscribe(observerA)
// setTimeout(() => intervalSource$.subscribe(observerB), 1000)

/**
  result:
  콜드 옵저버블의 구독은 각각 독립적으로 동작할 뿐 멀티캐스팅으로 값을 공유하지 않는다.

  observerA: 0
  observerA: 1
  observerB: 0
  observerA: 2
  observerB: 1
  observerA: 3
  observerB: 2
  observerA: 4
  observerA: complete
  observerB: 3
  observerB: 4
  observerB: complete
 */

// 서브젝트와 연결하여 핫 옵저버블 흉내내기
const observerA2 = {
  next: x => console.log(`observerA2: ${x}`),
  error: x => console.error(`observerA2: ${x}`),
  complete: () => console.log(`observerA2: complete`),
}

const observerB2 = {
  next: x => console.log(`observerB2: ${x}`),
  error: e => console.error(`observerB2: ${e}`),
  complete: () => console.log(`observerB2: complete`),
}

const observerC2 = {
  next: x => console.log(`observerC2: ${x}`),
  error: e => console.error(`observerC2: ${e}`),
  complete: () => console.log(`observerC2: complete`),
}

function createHotObservable(sourceObservable, subject) {
  return {
    connect: () => sourceObservable.subscribe(subject),
    subscribe: subject.subscribe.bind(subject),
  }
}

const sourceObservable$ = interval(500).pipe(
  take(5),
  tap(x => console.log(`tap ${x}`)),
)

const hotObservableExample = createHotObservable(sourceObservable$, new Subject())

hotObservableExample.subscribe(observerA2)
console.log(`observerA2 subscribe`)

hotObservableExample.subscribe(observerB2)
console.log(`observerB2 subscribe`)

hotObservableExample.connect()
console.log(`connect called`)

setTimeout(() => {
  console.log(`1000ms...`)
  hotObservableExample.subscribe(observerC2)
  console.log(`observerC2 subscribe`)
}, 1000)

/**
  result:

  observerA2 subscribe
  observerB2 subscribe
  connect called
  tap 0
  observerA2: 0
  observerB2: 0
  1000ms...
  observerC2 subscribe
  tap 1
  observerA2: 1
  observerB2: 1
  observerC2: 1
  tap 2
  observerA2: 2
  observerB2: 2
  observerC2: 2
  tap 3
  observerA2: 3
  observerB2: 3
  observerC2: 3
  tap 4
  observerA2: 4
  observerB2: 4
  observerC2: 4
  observerA2: complete
  observerB2: complete
  observerC2: complete
 */
