// ReplaySubject

/**
 * ReplaySubject는 next 함수로 지정한 개수만큼 연속해서 전달한 최신 값을 저장했다가 다음 구독 때 해당 개수만큼 옵저버로 발행한다.
 * 개수를 지정하지 않으면 메모리와 관련된 성능 문제가 발생함에 주의해야한다.
 */
import { ReplaySubject, interval } from 'rxjs'
import { take } from 'rxjs/operators'

// const replaySubject = new ReplaySubject(3)

// const intervalSource$ = interval(500).pipe(take(8))

// const observerA = {
//   next: x => console.log(`observerA next: ${x}`),
//   error: e => console.error(`observerA error ${e}`),
//   complete: () => console.log(`observerA complete!`),
// }
// const observerB = {
//   next: x => console.log(`observerB next: ${x}`),
//   error: e => console.error(`observerB error ${e}`),
//   complete: () => console.log(`observerB complete!`),
// }

// console.log('try replaySubject.subscribe(observerA)')
// replaySubject.subscribe(observerA)

// console.log('try intervalSource$.subscribe(replaySubject)')
// intervalSource$.subscribe(replaySubject)

// setTimeout(() => {
//   console.log('try replaySubject.subscribe(observerB), setTimeout 26000ms')
//   replaySubject.subscribe(observerB)
// }, 2600)
/**
  result:

  try replaySubject.subscribe(observerA)
  try intervalSource$.subscribe(replaySubject)
  observerA next: 0
  observerA next: 1
  observerA next: 2
  observerA next: 3
  observerA next: 4
  try replaySubject.subscribe(observerB), setTimeout 26000ms
  observerB next: 2
  observerB next: 3
  observerB next: 4
  observerA next: 5
  observerB next: 5
  observerA next: 6
  observerB next: 6
  observerA next: 7
  observerB next: 7
  observerA complete!
  observerB complete!
 */

/**
 * ReplaySubject 생성 부분에 인자를 사용하지 않으면 제한 없이 연속해서 값을 전달할 수 있다.
 */
const replaySubject2 = new ReplaySubject()
const intervalSource2$ = interval(500).pipe(take(8))

const observerA2 = {
  next: x => console.log(`observerA2 next: ${x}`),
  error: e => console.error(`observerA2 error ${e}`),
  complete: () => console.log(`observerA2 complete!`),
}
const observerB2 = {
  next: x => console.log(`observerB2 next: ${x}`),
  error: e => console.error(`observerB2 error ${e}`),
  complete: () => console.log(`observerB2 complete!`),
}

console.log('try replaySubject.subscribe(observerA2)')
replaySubject2.subscribe(observerA2)

console.log('try intervalSource2$.subscribe(replaySubject2)')
intervalSource2$.subscribe(replaySubject2)

setTimeout(() => {
  console.log('try replaySubject.subscribe(observerB2), setTimeout 2600ms')
  replaySubject2.subscribe(observerB2)
}, 2600)
/**
  result:
  제한없이 저장된다.
  (Number.POSITIVE_INFINITY를 내부적으로 설정한다.)

  try replaySubject.subscribe(observerA2)
  try intervalSource2$.subscribe(replaySubject2)
  observerA2 next: 0
  observerA2 next: 1
  observerA2 next: 2
  observerA2 next: 3
  observerA2 next: 4
  try replaySubject.subscribe(observerB2), setTimeout 2600ms
  observerB2 next: 0
  observerB2 next: 1
  observerB2 next: 2
  observerB2 next: 3
  observerB2 next: 4
  observerA2 next: 5
  observerB2 next: 5
  observerA2 next: 6
  observerB2 next: 6
  observerA2 next: 7
  observerB2 next: 7
  observerA2 complete!
  observerB2 complete!
 */
