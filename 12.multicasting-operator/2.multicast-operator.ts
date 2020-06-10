// multicast 연산자

/**
 * 소스 옵저버블로부터 multicast를 호출할 때 서브젝트 팩토리 함수를 사용해 커넥터블 옵저버블을 만들어 핫 옵저버블을 다룰 수 있다.
 */

// multicast 연산자의 connect 함수로 서브젝트 연결

/**
 * multicast 연산자는 서브젝트를 생성하는 팩토리 함수나 서브젝트 자체를 인자로 사용한다.
 * 이렇게 만들어진 옵저버블을 구독하면 첫번째 인자로 사용하는 서브젝트를 구독하기 때문에 당장은 아무런 값도 받지 못한다.
 * 그러다 connect 함수를 호출하면 소스 옵저버블에서 값을 발행하여 해당 서브젝트로 전달하고
 * 그동안 해당 옵저저블을 구독하도록 등록된 옵저버들은 서브젝트로 같은 값을 전달받을 수 있다.
 */

import { interval, Subject, zip, timer } from 'rxjs'
import { take, multicast, tap, mergeMap } from 'rxjs/operators'

const sourceObservable$ = interval(500).pipe(take(5))
const multi = sourceObservable$.pipe(multicast<number>(() => new Subject<number>()))

const subscribeOne = multi.subscribe(val => console.log(val))
const subscribeTwo = multi.subscribe(val => console.log(val))

;(multi as any).connect()

/**
  result:
  multi를 구독하면 multicast의 팩토리함수에서 리턴하는 서브젝트를 구독한다.
  connect를 이용해 해당 서브젝트가 소스 옵저버블을 구독하도록 한다.

  0
  0
  1
  1
  2
  2
  3
  3
  4
  4
 */
const subject = new Subject()
const sourceObservable$2 = interval(500).pipe(take(5))
const multi2 = sourceObservable$2.pipe(multicast(() => subject))

const subscribeOne2 = multi2.subscribe(val => console.log(val))
const subscribeTwo2 = multi2.subscribe(val => console.log(val))

subject.next(1)

/**
  result:
  결국 subject를 구독하는 것이다.
  다만 subject가 외부에 노출되는 것은 관리하기가 어렵다.

  1
  1
 */

// multicast 연산자의 선택자 함수
/**
 * multicast 연산자의 두번째 인자로 선택자 함수를 사용한다.
 * 선택자 함수 사용시 multicast 연산자가 리턴하는 옵저버블이 커넥터블 옵저버블로 변환되지 않고 다른 방식으로 멀티캐스팅한다.
 * 멀티캐스팅을 하지만 connect 함수를 제공하지 않고 동작한다.
 * 주의할 점은 구독할 때마다 팩토리 함수를 실행한다는 점이다.
 */

// 다음은 같은 옵저버블을 구독할 때 multicast 연산자를 구독하지 않는 예제이다.
interval(1500)
  .pipe(take(6))
  .subscribe(x => console.log(`${(x + 1) * 1500}ms elapsed`))

const sourceObservable3$ = interval(1500).pipe(
  take(5),
  tap(x => console.log(`tap ${x}`)),
)

zip(sourceObservable3$, sourceObservable3$, (a, b) => `${a},${b}`).subscribe(val => console.log(`value: ${val}`))
/**
  result:
  1500ms elapsed
  tap 0
  tap 0
  value: 0,0
  3000ms elapsed
  tap 1
  tap 1
  value: 1,1
  4500ms elapsed
  tap 2
  tap 2
  value: 2,2
  6000ms elapsed
  tap 3
  tap 3
  value: 3,3
  7500ms elapsed
  tap 4
  tap 4
  value: 4,4
  9000ms elapsed
 */

// 멀티캐스탕할 때 서브젝트 안에 있는 선택자 함수 이용
interval(1500)
  .pipe(take(6))
  .subscribe(x => console.log(`${(x + 1) * 1500}ms elapsed`))

const sourceObservable4$ = interval(1500).pipe(
  take(5),
  tap(x => console.log(`tap ${x}`)),
)

const multi4 = sourceObservable4$.pipe(
  multicast(
    () => new Subject(),
    subject => zip(subject, subject, (a, b) => `${a},${b}`),
  ),
)

multi4.subscribe(val => console.log(`value: ${val}`))
/**
  result:
  소스 옵저버블을 한번만 구독하므로 'tap숫자' 형식의 로그도 한번만 출력돤다.

  1500ms elapsed
  tap 0
  value: 0,0
  3000ms elapsed
  tap 1
  value: 1,1
  4500ms elapsed
  tap 2
  value: 2,2
  6000ms elapsed
  tap 3
  value: 3,3
  7500ms elapsed
  tap 4
  value: 4,4
  9000ms elapsed
 */
