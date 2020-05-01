// window

/**
 * window 연산자는 buffer연산자의 배열 대신 중첩 옵저버블로 값을 발행한다.
 * (groupBy에서 특정 옵저버블을 발행하는 것과 비슷한 패턴이다.)
 * 묶는 단위의 값을 인자로 받는다.
 *
 * window 연산자는 인자로 사용하는 옵저버블에서 그때그때 값을 발행한다.
 * 때문에 소스 옵저버블이 구독을 완료하기 전에도 발핼한 값을 전달받을 방법이 있다.
 * 인자로 사용하는 새 옵저버블은 소스 옵저버블의 구독을 완료할 때까지 값을 발행할 수 있는 옵저버블이기 때문이다.
 *
 * 이는 모든 값을 처리해야 결과를 얻을 수 있는 배열의 특성과 모든 값을 처리하기 전 일단 구독한 후 값을 발행해야하는 옵저버블의 차이점이 반영됐다.
 */
import { interval } from 'rxjs'
import { take, map, window, concatMap, filter, scan, last } from 'rxjs/operators'

const message = '안녕하세요. RxJS 테스트 입니다.'

interval(90)
  .pipe(
    take(message.length),
    map(x => {
      const character = message.charAt(x)
      console.log(character)
      return character
    }),
    window(interval(500)),
    concatMap(windowObservable => {
      console.log(`windowObservable 넘어옴`)
      return windowObservable.pipe(
        filter(x => x !== ' '),
        take(3),
        scan((accString, cur) => accString + cur, ''),
        last(),
      )
    }),
  )
  .subscribe(res => console.log(`result: ${res}`))

/**
  result:
  500ms가 지나면 window 연산자에서 인자로 사용하는 옵저버블에서 값을 발행하는 시점이 된다.
  따라서 windowObservable의 값을 새로 전달받는다. 이때 concatMap 연산자는 이미 값을 전달받은 옵저버블의 구독을 완료 처리했으므로
  소스 옵저버블 구독을 완료할 때까지 새 옵저버블을 구독하는 패턴을 반복 실행한다.

  windowObservable 넘어옴
  안
  녕
  하
  result: 안녕하
  세
  요
  windowObservable 넘어옴
  .

  R
  x
  result: .Rx
  J
  windowObservable 넘어옴
  S

  테
  스
  result: S테스
  트

  windowObservable 넘어옴
  입
  니
  다
  result: 입니다
  .
 */
