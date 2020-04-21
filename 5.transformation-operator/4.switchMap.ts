// switchMap 연산자

/**
 * mergeMap은 project 함수에서 리턴한 옵저버블을 구독하는 중 소스 옵저버블에서 새로운 값을 발행하면
 * 새로 구독하는 옵저버블도 구독한다.
 * 하지만 switchMap은 소스 옵저버블에서 새로운 값을 발행하면
 * 이전에 구독하여 완료하지 않은 옵저버블은 구독 해지한다.
 */
import { interval } from 'rxjs'
import { take, switchMap, map } from 'rxjs/operators'

interval(600)
  .pipe(
    take(5),
    switchMap(x =>
      interval(250).pipe(
        map(y => ({ x, y })),
        take(3),
      ),
    ),
  )
  .subscribe(res => console.log(`next: x: ${res.x}, y: ${res.y}`))
/**
  reuslt:
  next: x: 0, y: 0
  next: x: 0, y: 1 -> 소스 옵저버블에서 값이 발행되어 구독 취소, x: 0, y: 2 출력 X
  next: x: 1, y: 0
  next: x: 1, y: 1
  next: x: 2, y: 0
  next: x: 2, y: 1
  next: x: 3, y: 0
  next: x: 3, y: 1
  next: x: 4, y: 0
  next: x: 4, y: 1
  next: x: 4, y: 2 -> 소스 옵저버블은 더이상 발행을 하지 않으므로 기존 옵저버블의 구독이 취소되지 않음.
 */
