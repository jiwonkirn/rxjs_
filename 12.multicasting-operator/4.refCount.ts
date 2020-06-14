// refCount 연산자

/**
 * refCount 연산자는 커넥터블 옵저버블을 구독하는 옵저버의 수를 센 후 최초로 1이 되면 connect 함수를 자동으로 호출한다.
 * count는 구독 / 해제할 때마다 변경되며 count가 0이 되면 unsubscribe 함수까지 자동으로 호출해준다.
 */
import { interval, Subject, ConnectableObservable } from 'rxjs'
import { take, tap, multicast, publish, refCount } from 'rxjs/operators'

// const testSource$ = interval(500).pipe(
//   take(5),
//   tap(x => console.log(`tap ${x}`)),
//   multicast(() => new Subject()),
//   refCount()
// )

const testSource$ = interval(500).pipe(
  take(5),
  tap(x => console.log(`tap ${x}`)),
  publish(),
  refCount(),
) as ConnectableObservable<number>

const a = testSource$.subscribe(x => console.log(`a: ${x}`))
const b = testSource$.subscribe(x => console.log(`b: ${x}`))

setTimeout(() => {
  console.log('timeout')
  testSource$.subscribe(x => console.log(`c: ${x}`))
}, 3000)
/**
  result:

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
 */
