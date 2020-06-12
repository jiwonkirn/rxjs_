// publish 연산자

/**
 * multicast 연산자는 서브젝트나 서브젝트의 팩토리 함수를 직접 사용해야 했다.
 * publish는 서브젝트나 서브젝트의 팩토리 함수를 사용할 필요가 없도록 추상화된 연산자이다.
 *
 * - publish는 같은 서브젝트 객체를 공유하므로 소스 옵저버블 구독을 완료하면 내부에 생성한 서브젝트도 사용할 수 없다.
 * - connect 함수를 호출한 후 소스 옵저버블을 구독하다 완료하면 다시 connect 함수를 호출해도 이후 구독하는 옵저버들이 값을 전달받을 수 없다.
 * 이와같은 상환에서는 multicast연산자와 서브젝트를 매번 새로 생성해주는 팩토리 함수를 활용하거나 share 연산자를 사용한다.
 */

// 서브젝트 객체를 재구독할 때 발생할 수 있는 문제
import { interval, Subject, ConnectableObservable } from 'rxjs'
import { multicast, take, tap, publish } from 'rxjs/operators'

// const testSource$ = interval(500).pipe(
//   take(5),
//   tap(x => console.log(`tap ${x}`)),
//   multicast(() => new Subject()),
// ) as ConnectableObservable<number>

// const testSource2$ = interval(500).pipe(
//   take(5),
//   tap(x => console.log(`tap ${x}`)),
//   publish(),
// ) as ConnectableObservable<number>

// const a = testSource$.subscribe(x => console.log(`a: ${x}`))
// const b = testSource$.subscribe(x => console.log(`b: ${x}`))

// testSource$.connect()

// setTimeout(() => {
//   console.log('timeout')
//   a.unsubscribe()
//   b.unsubscribe()
//   testSource$.subscribe(x => console.log(`c: ${x}`))
//   testSource$.connect()
// }, 3000)
/**
  result:
  기존에 구독했던 subject의 구독이 완료되었으므로 c로 시작하는 부분은 실행되지 않는다.
  대신 소스 옵저버블은 동작하므로 tap연산자의 console은 출력된다.
  (multicast 연산자를 사용하면 c로 시작하는 부분까지 모두 출력된다.)

  tap 0
  a: 0
  b: 0
  tap 1
  a: 1
  b: 1
  tap 2
  a: 2
  b: 2
  tap 3
  a: 3
  b: 3
  tap 4
  a: 4
  b: 4
  timeout
  tap 0
  tap 1
  tap 2
  tap 3
  tap 4
 */

// publishXXX 연산자
/**
 * publishBehavior, publishReplay, publishLast 연산자는 특정 서브젝트 자체를 멀티캐스팅하는 연산자들이다.
 *
 * publishBehavior -> BehaviorSubject
 * publishReplay -> ReplaySubject
 * publishLast -> AsyncSubject
 * 이렇게 각각 매칭되는 서브젝트를 multicast연산자에서 사용해 커넥터블 옵저버블을 만들어준다. (multicast 연산자를 매핑)
 * publish 연산자와는 다르세 선택자 함수는 제공하지 않는다.
 */
