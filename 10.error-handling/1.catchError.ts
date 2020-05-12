// catchError

/**
 * catchError 는 에러가 발생했을 때 인자로 사용하는 선택자 함수로 해당 에러를 전달하여 여기에서 리턴하는 옵저버블을 대신 구독하는 연산자다.
 * try catch와 처리하는 방식이 깉다.
 *
 * 에러가 발생하면 소스옵저버블에서 더이상 값을 발행하지 않는다.
 * 이때 catchError 연산자는 선택자 함쉐서 리턴하는 옵저버블을 구독해 값을 발행한다.
 */
import { from, of } from 'rxjs'
import { map, tap, pluck, catchError, mergeMap } from 'rxjs/operators'

class ExtendedTypeError extends TypeError {
  constructor(message: string, public index: number, public integerCheckError: boolean) {
    super(message)
  }
}

const integers = ['1', '2', '3', 'r', '5']

// from(integers)
//   .pipe(
//     map((value, index) => ({ value, index })),
//     tap(valueIndex => {
//       const { value, index } = valueIndex
//       if (!Number.isInteger(parseInt(value, 10))) {
//         throw new ExtendedTypeError(`${value}는 정수가 아닙니다.`, index, true)
//       }
//     }),
//     pluck('value'),
//     catchError(err => {
//       if (err.name === 'TypeError' && err.integerCheckError) {
//         const restArray = integers.slice(err.index, integers.length).map(x => `에러 후 나머지 값 ${x}`)
//         return from([err.message, ...restArray])
//       }
//       return of(err.message)
//     }),
//   )
//   .subscribe(
//     x => console.log(x),
//     err => console.error(err),
//   )
/**
  result:
  catchError에서 error를 처리헀기 때문에 subscribe 함수애서 error함수를 호출하지 않는다.

  1
  2
  3
  r는 정수가 아닙니다.
  에러 후 나머지 값 r
  에러 후 나머지 값 5
 */

// mergeMap 연산자를 사용한 catchError 연산자 응용
from(['1', '2', '3', 'r', '5', '6', 'u', '8'])
  .pipe(
    mergeMap(x => {
      return of(x).pipe(
        tap(v => {
          if (!Number.isInteger(parseInt(v, 10))) {
            throw new TypeError(`${v}는 정수가 아닙니다.`)
          }
        }),
        catchError(err => of(err.message)),
      )
    }),
  )
  .subscribe(
    x => console.log(x),
    err => console.error(`error: ${err}`),
  )
/**
  result:
  mergeMap을 활용하여 에러가 나지 않은 값은 그대로 발행해도록 한다.

  1
  2
  3
  r는 정수가 아닙니다.
  5
  6
  u는 정수가 아닙니다.
  8
 */
