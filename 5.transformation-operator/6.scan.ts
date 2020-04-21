// scan 연산자

/**
 * scan 연산자는 reduce와 비슷하다.
 * 단, reduce 연산자가 값 1개만 발행한다면
 * scan 연산자는 next 함수로 값을 발행할 때 마다 호출해 중간에 누적된 값을 매번 발행한다.
 *
 * > rxjs의 reduce 연산자는 값 1개만 발행해야 하므로 complete 연산자를 호출해야 값을 발행한다.
 */

import { range, interval } from 'rxjs'
import { scan, take, pluck } from 'rxjs/operators'

// 초깃값이 없는 scan 연산자
range(0, 3)
  .pipe(
    scan((acc, cur) => {
      console.log(`accumulation ${acc}, current value ${cur}`)
      return acc + cur
    }),
  )
  .subscribe(res => console.log(`result ${res}`))
/**
  result:

  result 0 <- 초깃값(seed)가 없으면 scan 연산자 통과
  accumulation 0, current value 1
  result 1
  accumulation 1, current value 2
  result 3
 */

// 초깃값이 있는 scan 연산자
range(0, 3)
  .pipe(
    scan((acc, cur) => {
      console.log(`accumulation ${acc}, current value ${cur}`)
      return acc + cur
    }, 0),
  )
  .subscribe(res => console.log(`result: ${res}`))
/**
  result:

  accumulation 0, current value 0 <- 초깃값을 부여했기 때문에 scan 연산자 실행
  result: 0
  accumulation 0, current value 1
  result: 1
  accumulation 1, current value 2
  result: 3
 */

// 초깃값으로 객체를 사용하여 재구독하는 피보나치 수열 예
/**
 * 객체는 참조값, 어디서 변경할 수 있는 값이므로 초깃값이 변할 수 있다는 점을 주의해햐한다.
 */
const n = 7
const source$ = interval(500).pipe(
  take(n),
  scan(
    (acc, cur) => {
      const tempA = acc.a
      acc.a = acc.b
      acc.b = tempA + acc.b
      return acc
    },
    { a: 1, b: 0 },
  ),
  pluck('a'),
)

// source$.subscribe(res => console.log(`result1: ${res}`))
// setTimeout(() => source$.subscribe(res => console.log(`result2 ${res}`)), 3100)
/**
  result:

  result: 3
  result1: 0
  result1: 1
  result1: 1
  result1: 2
  result1: 3
  result1: 5
  result1: 8
  result2 13 <- scan 연산자는 내부 옵저버블 내에 참조를 저장한다.
  result2 21
  result2 34
  result2 55
  result2 89
  result2 144
  result2 233
 */

/**
 * 위 예제와 같이 scan 연산자는 내부 옵저버블 내에 참조를 저장하므로
 * 부수효과를 내며, 함수형 프로그래밍의 취지와 맞지 않다.
 */
interface Accumulation {
  a: number
  b: number
}

type AccumulationFactory = () => Accumulation

const source2$ = interval(500).pipe(
  take(n),
  scan<number, Accumulation | AccumulationFactory>(
    (acc, cur) => {
      let localAcc = acc
      if (typeof localAcc === 'function') {
        localAcc = localAcc()
      }
      const tempA = localAcc.a
      localAcc.a = localAcc.b
      localAcc.b = tempA + localAcc.b
      return localAcc
    },
    () => ({ a: 1, b: 0 }),
  ),
  pluck('a'),
)

source2$.subscribe(res => console.log(`result1 ${res}`))
setTimeout(() => source2$.subscribe(res => console.log(`result2 ${res}`)), 3100)

/**
  result:
  result1 0
  result1 1
  result1 1
  result1 2
  result1 3
  result1 5
  result1 8
  result2 0 <- 팩토리 함수를 통해 새로운 참조가 세팅됨
  result2 1
  result2 1
  result2 2
  result2 3
  result2 5
  result2 8
 */

/**
 * 하지만 윗 예제도 완벽하지 않다.
 * 첫 초기값만 다른 객체를 생성할 뿐 구독하는 중에 함수에서 return 하는 객체는 같다.
 * 즉 구독하는 중에는 부수효과를 피하기 어렵다.
 */
const source3$ = interval(500).pipe(
  take(n),
  scan(
    (acc, cur) => ({
      a: acc.b,
      b: acc.a + acc.b,
    }),
    { a: 1, b: 0 },
  ),
  pluck('a'),
)

source3$.subscribe(res => console.log(`result1 ${res}`))
setTimeout(() => source3$.subscribe(res => console.log(`result2 ${res}`)), 3100)
/**
  result: 매번 새로운 참조가 전달되기 때문에 부수효과를 막을 수 있다.

  result1 0
  result1 1
  result1 1
  result1 2
  result1 3
  result1 5
  result1 8
  result2 0
  result2 1
  result2 1
  result2 2
  result2 3
  result2 5
  result2 8
 */
