// retryWhen

/**
 * retrtWhen은 옵저버블 구독을 재시도한다는 점애서 retry 연산자와 비슷하지만
 * 구독을 재시도하기 전 에러를 전달받아 특정한 옵저버블에서 발행한 후 구독을 재시도하는 연산자다.
 *
 * 연산자의 첫번째 파라미터로 사용하는 notifier 함수는 소스 옵저버블애서 애러가 발생했을 때 해당 에러를 errors라는 옵저버블로 다룬다.
 * 아 옵저버블의 스트림을 전달받아 notifier에서 리턴하는 옵저버블을 구독한다.
 *
 * notifier에서 리천하는 옵저버블의 값을 발행하면 이어서 소스 옵저버블 구독을 재시도한다.
 * 여기서 에러가 발생하면 전체 스트림의 구독을 취소한다.
 *
 * complete 함수를 호출하면 똑같이 complete 함수를 호출하므로
 * 구독 재시도가 필요하면 재시도하기 전 해줘야 할 일을 처리한 후 아무 값이든 발행해 해당 스트림을 종료시키지 않아야한다.
 *
 * 만약 더이상 재시고하지 않고 에러를 발생시키거나 complete 함수를 호출하여 구독을 완료해야 한다면,
 * notifier에서 리턴하는 옵저버블에서 take 연산자나 throwErorr 함수 등으로 complete 또는 error 함수 호출을 유도해야한다.
 */

import { interval, of, throwError } from 'rxjs'
import { take, mergeMap, tap, retryWhen, scan, catchError } from 'rxjs/operators'

interface ErrorInfo {
  count: number
  error?: Error
}

interval(100)
  .pipe(
    take(30),
    mergeMap(x => {
      return of(x).pipe(
        tap(value => {
          if (Math.random() <= 0.3) {
            throw new Error(`RANDOM Error ${value}`)
          }
        }),
        retryWhen(errors => {
          return errors.pipe(
            scan<any, ErrorInfo>(
              (acc, error) => {
                return {
                  count: acc.count + 1,
                  error,
                }
              },
              { count: 0 },
            ),
            tap(errorInfo =>
              console.error(`retryCount: ${errorInfo.count}, error message: ${errorInfo?.error?.message}`),
            ),
          )
        }),
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
  몇번 구독 재시도하여 성공했는지 알 수 있다.

  retryCount: 1, error message: RANDOM Error 0
  0
  1
  retryCount: 1, error message: RANDOM Error 2
  retryCount: 2, error message: RANDOM Error 2
  2
  3
  retryCount: 1, error message: RANDOM Error 4
  4
  5
  6
  retryCount: 1, error message: RANDOM Error 7
  7
  8
  9
  10
  11
  12
  retryCount: 1, error message: RANDOM Error 13
  retryCount: 2, error message: RANDOM Error 13
  retryCount: 3, error message: RANDOM Error 13
  13
  retryCount: 1, error message: RANDOM Error 14
  14
  15
  retryCount: 1, error message: RANDOM Error 16
  16
  17
  18
  19
  20
  retryCount: 1, error message: RANDOM Error 21
  21
  22
  retryCount: 1, error message: RANDOM Error 23
  23
  24
  retryCount: 1, error message: RANDOM Error 25
  25
  retryCount: 1, error message: RANDOM Error 26
  26
  27
  28
  29
 */

// n회 재시도 후 에러 없이 complete 함수 호출
interval(100)
  .pipe(
    take(30),
    mergeMap(x => {
      return of(x).pipe(
        tap(value => {
          if (Math.random() <= 0.5) {
            throw new Error(`RANDOM ERROR ${value}`)
          }
        }),
        retryWhen(errors => {
          return errors.pipe(
            take(2),
            scan<any, ErrorInfo>(
              (acc, error) => {
                return {
                  count: acc.count + 1,
                  error,
                }
              },
              { count: 0 },
            ),
            tap(errorInfo =>
              console.error(`retryCount: ${errorInfo.count}, error message: ${errorInfo.error?.message}`),
            ),
          )
        }),
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
  9, 10, 12, 13의 경우 2번을 시도해도 error가 나서 발행되지 못했다.

  0
  retryCount: 1, error message: RANDOM ERROR 1
  1
  2
  3
  4
  retryCount: 1, error message: RANDOM ERROR 5
  retryCount: 2, error message: RANDOM ERROR 5
  5
  retryCount: 1, error message: RANDOM ERROR 6
  6
  7
  retryCount: 1, error message: RANDOM ERROR 8
  retryCount: 2, error message: RANDOM ERROR 8
  8
  retryCount: 1, error message: RANDOM ERROR 9
  retryCount: 2, error message: RANDOM ERROR 9
  retryCount: 1, error message: RANDOM ERROR 10
  retryCount: 2, error message: RANDOM ERROR 10
  11
  retryCount: 1, error message: RANDOM ERROR 12
  retryCount: 2, error message: RANDOM ERROR 12
  retryCount: 1, error message: RANDOM ERROR 13
  retryCount: 2, error message: RANDOM ERROR 13
  14
  retryCount: 1, error message: RANDOM ERROR 15
  15
  16
  17
  retryCount: 1, error message: RANDOM ERROR 18
  18
  19
  retryCount: 1, error message: RANDOM ERROR 20
  retryCount: 2, error message: RANDOM ERROR 20
  retryCount: 1, error message: RANDOM ERROR 21
  retryCount: 2, error message: RANDOM ERROR 21
  21
  22
  23
  24
  25
  retryCount: 1, error message: RANDOM ERROR 26
  26
  27
  28
  29
 */

// n회 재시도 후 에러처리
const n = 2
interval(100)
  .pipe(
    take(30),
    mergeMap(x => {
      return of(x).pipe(
        tap(value => {
          if (Math.random() <= 0.5) {
            throw new Error(`RANDOM ERROR ${value}`)
          }
        }),
        retryWhen(errors => {
          return errors.pipe(
            scan<any, ErrorInfo>(
              (acc, error) => {
                return {
                  count: acc.count + 1,
                  error,
                }
              },
              { count: 0 },
            ),
            mergeMap(errorInfo => {
              if (errorInfo.count === n + 1) {
                return throwError(errorInfo.error)
              }
              return of(errorInfo)
            }),
            tap(errorInfo =>
              console.error(`retryCount: ${errorInfo.count}, error message: ${errorInfo.error?.message}`),
            ),
          )
        }),
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
  1, 6, 17, 24는 2번 시도 후에도 실패하여 throwError와 catchError를 통해 에러 메세지를 발행한다.

  retryCount: 1, error message: RANDOM ERROR 0
  0
  retryCount: 1, error message: RANDOM ERROR 1
  retryCount: 2, error message: RANDOM ERROR 1
  RANDOM ERROR 1
  2
  3
  retryCount: 1, error message: RANDOM ERROR 4
  4
  5
  retryCount: 1, error message: RANDOM ERROR 6
  retryCount: 2, error message: RANDOM ERROR 6
  RANDOM ERROR 6
  retryCount: 1, error message: RANDOM ERROR 7
  7
  8
  9
  10
  retryCount: 1, error message: RANDOM ERROR 11
  retryCount: 2, error message: RANDOM ERROR 11
  11
  12
  13
  retryCount: 1, error message: RANDOM ERROR 14
  retryCount: 2, error message: RANDOM ERROR 14
  RANDOM ERROR 14
  retryCount: 1, error message: RANDOM ERROR 15
  15
  16
  retryCount: 1, error message: RANDOM ERROR 17
  retryCount: 2, error message: RANDOM ERROR 17
  RANDOM ERROR 17
  retryCount: 1, error message: RANDOM ERROR 18
  18
  19
  20
  retryCount: 1, error message: RANDOM ERROR 21
  21
  22
  23
  retryCount: 1, error message: RANDOM ERROR 24
  retryCount: 2, error message: RANDOM ERROR 24
  RANDOM ERROR 24
  retryCount: 1, error message: RANDOM ERROR 25
  25
  26
  27
  28
  retryCount: 1, error message: RANDOM ERROR 29
  29
 */
