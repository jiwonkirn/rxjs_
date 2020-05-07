// 샘플링 연산자

/**
 * 스트림에서 발행하는 값 중 모든 값이 필요하지 않고 일부 샘플만 있어도 충분할 때가 있다.
 * 불필요하게 모든 값을 발행하는 것은 낭비이기 때문에 표본만 발행하도록 할 수 있다.
 */
import { interval, timer } from 'rxjs'
import { sample, take, sampleTime } from 'rxjs/operators'

/**
 * sample 연산자
 * notifier라는 옵저버블을 인자로 사용해
 * notifier 옵저버블에서 값을 발행할 때마다 소스 옵져버블의 가장 최근 값을 발행한다.
 * notifier에서 complete 함수를 호출해도 소스 옵저버블의 가장 최근 값은 발행한다.
 * notifier에서 값을 발행해도 소스 옵저버블의 값이 최신화되지 않으면 값을 발행하지 않는다.
 */
const sampleSize = 3
const sourceInterval = 200
const sampleDelay = 100

interval(sourceInterval)
  .pipe(
    sample(
      timer(
        sourceInterval + sampleDelay, // timeout 300
        sourceInterval * sampleSize, // interval 600
      ),
    ),
    take(4),
  )
  .subscribe(v => console.log(v))

/**
  result
  0
  3
  6
  9

  설명:
  0(200) ------ 3(800ms) ------ 6(1400ms) ------ 9(2000ms)
      0 -> 0(300ms)    1 -> 3(900ms)   2 -> 6(1500ms)   3 > 9(2100ms)
 */

/**
 * sampleTime 연산자
 * ms단위의 발행 간격을 인자로 설정한 후
 * 해당 발행 간격 사이에 있는 최근 값을 확인해 발행하는 연산자이다.
 * 연속적으로 발행하는 이벤트 중 일정 간격으로 가장 최근 것 하나만 뽑아 처리할 때 유용하다.
 */
const sourcePoint = 300
const sourceDelay = 400
const sampleCount = 2
const samplePeriod = sourceDelay * sampleCount // 800ms

timer(sourcePoint, sourceDelay) // 300ms 400ms
  .pipe(
    sampleTime(samplePeriod), // 800ms
    take(3),
  )
  .subscribe(v => console.log(v))

/**
  result:
  1
  3
  5

  설명:
  300 - 700 - 1100 - 1500 - 1900 - 2300
          800(1)       1600(3)       2400(5)
 */
