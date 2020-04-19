// 값 발행 후 일정 시간을 기다리는 연산자

/**
 * - 소스 옵저버블의 값을 바로 발행하지 않고 일정 시간을 기다린다.
 * - 일정 시간동안 소스 옵저버블에서 새 값을 발행하지 않으면 조건에 따라 특정 값을 발행한다.
 * - 일정 시간동안 새 값을 발행하면 다시 일정 시간동안 발행하는 값이 없는지 기다린다.
 * - 조건을 만족할 때는 값 발행을 건너뛰다가 처음으로 조건을 만족하지 않는 순간부터 계속 값을 발행한다.
 */

/**
 * 빠른 비동기 요청에서 오는 응답이나 이벤트 중 일정 시간 안에 발생한 것만 처리할 때 유용하다.
 * (빠른 속도의 키보드 타이핑이나 마우스 클릭)
 */
import { interval } from 'rxjs'
import { take, debounce, tap, debounceTime } from 'rxjs/operators'

/**
 * debounce 연산자
 * 선택자 함수로, 소스 옵져버블에서 발행하는 값을 인자로 사용한다. 
 * 해당 선택자 함수에서 리턴하는 옵저버블이나 프로미스는 소스 옵저버블에서 발행한 다음 값을 전달받지 않으면 값을 발행한다.
 */
const sourceInterval = 400

interval(sourceInterval).pipe(
  take(8),
  debounce(srcVal => interval(
    srcVal % 2 === 0 ? sourceInterval * 1.2 : sourceInterval * 0.8
  ).pipe(
    tap(innerVal => console.log(
      `sourceInterval value: ${srcVal},
      innerInterval value: ${innerVal}`
    ))
  ))
).subscribe(x => console.log(`result: ${x}`))

/**
  result:
  홀수일 때 interval 시간이 400 * 0.8로 빨라지면서 값을 방출할 수 있게된다.

  sourceInterval value: 1,
        innerInterval value: 0
  result: 1
  sourceInterval value: 3,
        innerInterval value: 0
  result: 3
  sourceInterval value: 5,
        innerInterval value: 0
  result: 5
  result: 7
 */


/**
 * debounceTime 연산자
 * 값의 발행을 기다리는 일정 시간을 인자로 설정한 후 
 * 해당 시간 안에 소스 옵저버블에서 발행한 다음 값을 전달받지 않으면 최근 값을 그대로 발행하는 연산자.
 */

// 1.
interval(3000).pipe(
  take(8),
  debounceTime(2000)
).subscribe(x => console.log(
  `- interval(3000).pipe(take(4), debounceTime(2000)) next: ${x}`
))

// 2.
interval(400).pipe(
  take(8),
  debounceTime(500)
).subscribe(x => console.log(
  `-- interval(400).pipe(take(4), debounceTime(500)) next: ${x}`
))
/**
  result:
  1번은 소스 옵저버블의 interval time보다 debounceTime이 짧기 때문어 모든 값을 발행할 수 있다.
  하지만 2번은 debounceTime이 더 길기때문에 값을 발행하지 않다가 마지막 값을 발행한다.
  마지막 값은 이후에 값이 없으므로 complete 함수와 동시에 무조건 발행된다.

  - interval(400).pipe(take(4), debounceTime(300)) next: 0
  - interval(400).pipe(take(4), debounceTime(300)) next: 1
  - interval(400).pipe(take(4), debounceTime(300)) next: 2
  - interval(400).pipe(take(4), debounceTime(300)) next: 3
  -- interval(400).pipe(take(4), debounceTime(500)) next: 3
 */