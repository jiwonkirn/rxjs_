// concat

/**
 * concat 연산자는 merge 연산자와는 달리 옵저버블의 구독 순서를 보장한다.
 * 연산자 내부에서 merge 연산자를 이용하며 동시에 구독할 수 있는 concurrent 값을 1로 설정한다.
 * 인자는 ...observables 혹은 스케줄러 타입을 사용한다.
 */
import { timer, concat } from 'rxjs'
import { map } from 'rxjs/operators'

const req1$ = timer(Math.floor(Math.random() * 2000)).pipe(map(v => `req1`))
const req2$ = timer(Math.floor(Math.random() * 1000)).pipe(map(v => `req2`))
const req3$ = timer(Math.floor(Math.random() * 1500)).pipe(map(v => `req3`))

concat(req1$, req2$, req3$).subscribe(req => console.log(`response from ${req}`))
/**
  result:
  동시 구독 가능한 옵저버블이 하나이므로 순서대로 발행.

  response from req1
  response from req2
  response from req3
 */

// 아래 코드와 같다.
// merge(req1$, req2$, req3$, 1).subscribe(req => console.log(`response from ${req}`))
