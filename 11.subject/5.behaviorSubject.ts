/**
 * BehaviorSubject
 * 생성할 때 초깃값을 전달하고 옵저버의 함수가 한 번도 호출하지 않아 아무 값도 전달받지 않는다면 초깃값을 그대로 사용한다.
 * error나 complete 함수가 호출되지 않았다면 subscribe 함수를 호출할 때마다 최근에 next 함수에서 전달받은 값을 준다.
 */
import { BehaviorSubject, interval } from 'rxjs'
import { take, map } from 'rxjs/operators'

// const behaviorSubject = new BehaviorSubject('초기값')

const observerA = {
  next: x => console.log(`observerA next: ${x}`),
  error: e => console.log(`observerA error: ${e}`),
  complete: () => console.log(`observerA complete`),
}
const observerB = {
  next: x => console.log(`observerB next: ${x}`),
  error: e => console.log(`observerB error: ${e}`),
  complete: () => console.log(`observerB complete`),
}
const observerC = {
  next: x => console.log(`observerC next: ${x}`),
  error: e => console.log(`observerC error: ${e}`),
  complete: () => console.log(`observerC complete`),
}

// behaviorSubject.subscribe(observerA)
// behaviorSubject.next('값1')

// behaviorSubject.subscribe(observerB)
// behaviorSubject.next('값2')

// behaviorSubject.subscribe(observerC)
// behaviorSubject.next('값3')
// behaviorSubject.next('값4')
// behaviorSubject.next('값5')
/**
  result:

  observerA next: 초기값
  observerA next: 값1
  observerB next: 값1
  observerA next: 값2
  observerB next: 값2
  observerC next: 값2
  observerA next: 값3
  observerB next: 값3
  observerC next: 값3
  observerA next: 값4
  observerB next: 값4
  observerC next: 값4
  observerA next: 값5
  observerB next: 값5
  observerC next: 값5
 */

/**
 * 현재값을 가져올 수 있는 value 또는 getValue함수
 * BehaviorSubject는 서브젝트 중 유일하게 항상 값을 갖는다.
 * 따라서 현재 값을 subscribe 함수 호출 없이 바로 전달받을 수 았는 getter함수를 제공한다.
 */

const behaviorSubject2 = new BehaviorSubject(0)

const incrementInterval$ = interval(1000).pipe(
  take(5),
  map(x => behaviorSubject2.value + 1),
  // map(x => behaviorSubject2.getValue() + 1)
)

// increment를 behaviorSubject2에 연결하여 구독 시작
incrementInterval$.subscribe(behaviorSubject2)

behaviorSubject2.subscribe(observerA)

// 3.2초 후 observerB를 구독해 가장 최신의 값이 바로 나오는지 확인
setTimeout(() => behaviorSubject2.subscribe(observerB), 3200)
/**
  result:
  scan이나 reduce 연산자를 사용하지 않고도 내부의 값을 통해 값을 누적할수 있다.

  observerA next: 0
  observerA next: 1
  observerA next: 2
  observerA next: 3
  observerB next: 3
  observerA next: 4
  observerB next: 4
  observerA next: 5
  observerB next: 5
  observerA complete
  observerB complete
 */
