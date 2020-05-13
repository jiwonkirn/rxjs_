// 서브젝트와 옵저버블을 연결

/**
 * 서브젝트 자체는 next, error, complete 함수만으로 값을 발행하므로 실용적이지 읺을 수 있다.
 * 특정 옵저버블에서 보내는 값, 이벤트, 에러, 완료를 멀티캐스팅할 수 있게 연계하는 방법이 필요하다.
 */
import { Subject, interval } from 'rxjs'
import { take } from 'rxjs/operators'

// 콜드 옵저버블의 경우
const intervalSource$ = interval(500).pipe(take(5))

const observerA = {
  next: x => console.log(`observerA: ${x}`),
  error: e => console.error(`observerA: ${e}`),
  complete: () => console.log(`observerA: complete`),
}

const observerB = {
  next: x => console.log(`observerB: ${x}`),
  error: e => console.error(`observerB: ${e}`),
  complete: () => console.log(`observerB: complete`),
}

intervalSource$.subscribe(observerA)
setTimeout(() => intervalSource$.subscribe(observerB), 2000)
/**
  result:
  콜드 옵저버블은 구독이 따로 종작하며 매번 새로 구독하는 구조다.

  observerA: 0
  observerA: 1
  observerA: 2
  observerA: 3
  observerB: 0
  observerA: 4
  observerA: complete
  observerB: 1
  observerB: 2
  observerB: 3
  observerB: 4
  observerB: complete
 */

const subject = new Subject()

const intervalSource2$ = interval(500).pipe(take(5))

const observerA2 = {
  next: x => console.log(`observerA2: ${x}`),
  error: e => console.error(`observerA2: ${e}`),
  complete: () => console.log(`observerA2: complete`),
}

const observerB2 = {
  next: x => console.log(`observerB2: ${x}`),
  error: e => console.error(`observerB2: ${e}`),
  complete: () => console.log(`observerB2: complete`),
}

subject.subscribe(observerA2)

// intervalSource2$.subscribe({
//   next: x => subject.next(x),
//   error: e => subject.error(e),
//   complete: () => subject.complete(),
// })

// 위 코드를 아래처럼 간결하게 작성할 수 있는데 이는 subject가 옵저버이기도 하기 때문이다.
intervalSource2$.subscribe(subject)

setTimeout(() => subject.subscribe(observerB2), 2000)
/**
  result:
  단일 서브젝트(스트림)에 여러 옵저버가 붙는 방식이다.

  observerA2: 0
  observerA2: 1
  observerA2: 2
  observerA2: 3
  observerB2: 3
  observerA2: 4
  observerB2: 4
  observerA2: complete
  observerB2: complete
 */
