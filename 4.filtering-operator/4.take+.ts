// 명시적으로 구독 해제하지 않도록 돕는 연산자

/**
 * rxjs는 unsubscribe 함수를 명시적으로 호출해 구독을 해제한다. 
 * 구독과 구독해제 부분이 나뉘어지면 옵저버블의 전체 사이클을 관리하기 어렵다.
 * 때문에 count나 조건에 따라 구독 해제를 제어하는 연산자를 제공한다.
 */
import { interval, fromEvent } from 'rxjs'
import { filter, take, takeUntil, takeWhile, takeLast } from 'rxjs/operators'

/**
 * take
 * 정해진 개수만큼 구독하고 구독을 해제하는 연산자
 */
interval(1000).pipe(
  take(5)
).subscribe(
  v => console.log(`next: ${v}`),
  ({ message }) => console.log(`error.message: ${message}`),
  () => console.log(`complete`)
)

/** result:
  next: 0
  next: 1
  next: 2
  next: 3
  next: 4
  complete
 */

/**
 * takeUntil
 * 특정 이벤트가 발생하면 구독을 해제하는 연산자
 */
// <div class="display"></div>
// <button class="stop_btn">정지</button> 

const displayEl = document.querySelector('.display')
const stopButtonEl = document.querySelector('.stop_btn')

interval(1000).pipe(
  take(1000),
  takeUntil(fromEvent(stopButtonEl as Element, 'click'))
).subscribe(
  v => {
    (displayEl as Element).textContent = `${v} seconds`
  },
  ({ message }) => console.log(`error.message: ${message}`),
  () => console.log('complete')
)

/**
 * takeWhile
 * predicate 콜백이 참을 반환하는 동안 값을 발행하고
 * 거짓을 반환하면 구독을 해제하는 연산자
 */
interval(300).pipe(
  filter(v => v >= 7 || v % 2 === 0),
  takeWhile(v => v <= 10)
).subscribe(
  v => console.log(`next2: ${v}`),
  ({ message }) => console.log(`error.message: ${message}`),
  () => console.log('complete')
)

/** result:
  next: 0
  next: 2
  next: 4
  next: 6
  next: 7
  next: 8
  next: 9
  next: 10
  complete
*/

/**
 * takeLast
 * 마지막에 발행한 값을 기준으로 인자로 설정한 수만큼 발행한다.
 * takeLast는 내부적으로 링 형태로 순환하며 값을 바꾼다. 때문에 효율적으로 값을 저장하고 발행한다.
 * index = count % total
 * [1,2,3,4] -> [5,2,3,4] ...
 */
interval(300).pipe(
  filter(v => v >= 7 || v % 2 === 0),
  takeWhile(v => v <= 10),
  takeLast(4)
).subscribe(
  v => console.log(`next3: ${v}`),
  ({ message }) => console.log(`error.message: ${message}`),
  () => console.log(`complete`)
)

/** result:
  next: 7
  next: 8
  next: 9
  next: 10
  complete
*/
