// finalize

/**
 * finalize 연산자는 옵저버블 스트림 실행을 완료하거나 에러가 발생했을 때 인자로 사용하는 콜백 함수 대신 호출하는 연산자이다.
 * (5버전에서는 finaliy)
 * (finalize는 옵저버블 라이프사이클을 전달받는 콜백 함수를 등록하는 ReactiveX do 연산자 종류 중 하나다.)
 *
 * filnalize 연산자는 기존 구독하는 소스 옵저버블에 영향을 주지 않고 옵저버블 라이프사이클이 끝날 때 호출되는 콜백 함수를 인자로 사용한다.
 * 즉 소스 옵저버블 구독을 완료하거나 에러가 발생했을 때 구족을 해제하면서 finalize 연산자에 등록한 콜백 함수를 같이 호출한다.
 */

import { range } from 'rxjs'
import { finalize, tap } from 'rxjs/operators'

range(1, 3)
  .pipe(finalize(() => console.log('FINAL CALLBACK')))
  .subscribe(console.log, console.error, () => console.log('COMPLETE'))
/**
  result:

  1
  2
  3
  COMPLETE
  FINAL CALLBACK
 */

// 에러가 발생했을 때의 finalize 연산자 사용
range(1, 3)
  .pipe(
    tap(x => {
      if (x === 3) {
        throw new Error("x can't be 3")
      }
    }),
    finalize(() => console.log('FINALLY CALLBACK')),
  )
  .subscribe(
    x => console.log(`result: ${x}`),
    err => console.error(`ERROR: ${err}`),
  )
/**
  result:

  result: 1
  result: 2
  ERROR: Error: x can't be 3
  FINALLY CALLBACK
 */
