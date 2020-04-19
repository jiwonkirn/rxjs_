// 중복 값을 발행하지 않는 연산자.

import { of, interval } from 'rxjs'
import { distinct, take, map, distinctUntilChanged } from 'rxjs/operators'

interface FakeData {
  id: number
  value: number
}

/**
 * distinct 연산자
 * 자체 구현한 Set 자효구조를 통해 이미 발행한 값을 중복없이 저장했다가 같은 값을 전달받으면 발행하지 않는다.
 */
of(1, 6, 7, 7, 2, 5, 5, 2, 6).pipe(distinct()).subscribe(v => console.log(v))

/**
  result
  1
  6
  7
  2
  5
 */

 
 /**
  * distinct 연산자 - keySelector parameter
  * object 타입의 경우 참조이기 때문에 중복 비교가 어렵다. 
  * 떼문에 keySelector를 통해 object 내의 고유값을 지정하여 중복을 검사할 수 있다.
  */

of(
  { id: 1, value: 20 },
  { id: 2, value: 40 },
  { id: 3, value: 70 },
  { id: 1, value: 20 },
  { id: 2, value: 40 },
  { id: 3, value: 70 },
).pipe(distinct<FakeData, FakeData['id']>(({id}) => id)).subscribe(v => console.log(v))

/**
  result
  { id: 1, value: 20 }
  { id: 2, value: 40 }
  { id: 3, value: 70 }
 */


 /**
  * distinct 연산자 - flush parameter
  * 두번쩨 매개변수인 flush는 옵져버블을 사용한다.
  * distinct를 사용하는 옵저버블을 구독할 때 같이 구독하며, 
  * flush 옵져버블이 값을 발행하면 Set 자료구조를 초기화한다.
  */

interval(200).pipe(
  take(25),
  map(v => ({ original: v, value: v % 5 })),
  distinct(obj => obj.value, interval(2100))
).subscribe(v => console.log(JSON.stringify(v)))

/**
  result:
  {"original":0,"value":0}
  {"original":1,"value":1}
  {"original":2,"value":2}
  {"original":3,"value":3}
  {"original":4,"value":4}
  {"original":10,"value":0}
  {"original":11,"value":1}
  {"original":12,"value":2}
  {"original":13,"value":3}
  {"original":14,"value":4}
  {"original":20,"value":0}
  {"original":21,"value":1}
  {"original":22,"value":2}
  {"original":23,"value":3}
  {"original":24,"value":4}
 */

/**
 * distinctUntilChanged 연산자
 * 같은 값이 연속으로 있는지 검사하는 연산자이다.
 * 연속되는 값이 있다면 최초 1개만 발행하고 발행하지 않는다.
 * 비교는 엄격한 동등 비교(===)를 수행한다.
 */
of(1, 6, 7, 7, 2, 5, 5, 2, 6).pipe(distinctUntilChanged()).subscribe(v => console.log(v))

/**
  result:
  1
  6
  7
  2
  5
  2
  6
 */


/**
 * distinctUntilChanged - compare parameter
 * 어떻게 같은 값인지 비교할 때 사용하는 함수를 인자로 부여한다.
 */ 
of(
  { a: 1, b: 20 },
  { a: 1, b: 20 },
  { a: 2, b: 40 },
  { a: 3, b: 70 },
  { a: 3, b: 70 },
  { a: 2, b: 40 },
).pipe(
  distinctUntilChanged((o1, o2) => o1.a === o2.a && o1.b === o2.b)
).subscribe(v => console.log(JSON.stringify(v)))

/**
  result:
  {"a":1,"b":20}
  {"a":2,"b":40}
  {"a":3,"b":70}
  {"a":2,"b":40}
 */


/**
 * distinctUntilChanged - keySelector parameter
 * discinct 연산자와 마찬가지로 어떤 값을 비교할 것인지 선택하는 선택자 함수이다.
 * 아래처럼 compare와 함께 조합해서 사용할 수 있다.
 */
interface FakeObject {
  a: number
  b: number
}
of (
  { objKey: { a: 1, b: 20 } },
  { objKey: { a: 1, b: 20 } },
  { objKey: { a: 2, b: 40 } },
  { objKey: { a: 3, b: 70 } },
  { objKey: { a: 3, b: 70 } },
  { objKey: { a: 2, b: 40 } },
).pipe(
  distinctUntilChanged<{objKey: FakeObject}, FakeObject>(
    (o1, o2) => o1.a === o2.a && o1.b === o2.b,
    obj => obj.objKey
  )
).subscribe(v => console.log(JSON.stringify(v)))

/**
  result:
  {"objKey":{"a":1,"b":20}}
  {"objKey":{"a":2,"b":40}}
  {"objKey":{"a":3,"b":70}}
  {"objKey":{"a":2,"b":40}}
 */