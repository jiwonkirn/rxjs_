// pluck 연산자

/**
 * pluck는 map 연산자처럼 동작하지만, 
 * 소스 옵저버블에서 객체를 리턴할 때 해당 객체의 속성을 기준으로 변환하는 연산자다.
 */
import { range } from 'rxjs'
import { map, pluck } from 'rxjs/operators'

const source$ = range(0, 5).pipe(
  map(v => ({ v, isEven: v % 2 === 0 }))
)

source$.pipe(pluck('isEven')).subscribe(isEven => console.log(`${isEven ? '짝수' : '홀수'}입니다.`))
source$.pipe(pluck('v')).subscribe(v => console.log(`${v} 입니다.`))

/**
  result:
  짝수입니다.
  홀수입니다.
  짝수입니다.
  홀수입니다.
  짝수입니다.
  0 입니다.
  1 입니다.
  2 입니다.
  3 입니다.
  4 입니다.
*/


// 중첩된 속성이 있는 객체
const source2$ = range(0, 5).pipe(
  map(v => ({ v, numberProperty: { isEven: v % 2 === 0 } }))
)

source2$.pipe(pluck('numberProperty', 'isEven'))
  .subscribe(isEven => console.log(`${isEven ? '짝수' : '홀수'}입니다.`))

/**
  result:
  짝수입니다.
  홀수입니다.
  짝수입니다.
  홀수입니다.
  짝수입니다.
*/
