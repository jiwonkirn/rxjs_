// retry

/**
 * retry는 에러가 발생했을 때 인자로 설정란 정숫값만큼 소스 옵저버블 구독을 재시도하는 연산자다.
 * 인자로 설정한 값만큼 재시도하다가 다시 애러가 발생하면 이를 처리한다.
 *
 * parameter의 default값은 -1인데 이는 에러가 발생하지 않는다면 재시도를 하지 않으려는 목적이다.
 * retry 연산자는 구독을 재시도할 때 소스 옵저버블을 다시 구독해서 처음부터 값을 발행한다.
 */
import { interval, of } from 'rxjs'
import { take, mergeMap, tap, retry, catchError } from 'rxjs/operators'

interval(100)
  .pipe(
    take(30),
    mergeMap(x => {
      return of(x).pipe(
        tap(v => {
          if (Math.random() <= 0.3) {
            throw new Error(`Random error ${v}`)
          }
        }),
        retry(10), // 재시도 횟수와 유무에 따라 에러를 방자할 수 있다.
        catchError(err => of(err.message)),
      )
    }),
  )
  .subscribe(
    x => console.log(x),
    err => console.error(err),
  )
/**
  result:
  retry 없는 경우

  0
  1
  Random error 2
  3
  4
  5
  Random error 6
  Random error 7
  8
  Random error 9
  10
  11
  12
  Random error 13
  Random error 14
  15
  ...

  retry 적용한 경우
  0
  1
  2
  3
  4
  5
  6
  7
  8
  9
  10
  11
  12
  13
  14
  15
  ...

  아예 처음부터 다시 구독하려는 경우는 mergeMap을 사용하지 않는다
 */
