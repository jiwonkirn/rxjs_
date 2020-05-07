// groupBy

/**
 * groupBy 연산자는 소스 옵저버블에서 발행하는 값을 특정 기준을 정해 같은 그룹에 속해 있는 값들을 각각의 옵저버블로 묶어서 발행한다.
 * 그룹을 묶는 기준: 키
 * 키값을 만드는 함수: keySelector
 * 값들을 발행하는 옵저버블: groupedObservable
 */

/**
 * function groupBy<T, K, R>(
 *   keySelector: (value: T) => K,
 *   elementSelector?: (value: T) => R,
 *   durationSelector?: (grouped: GroupedObservable<K, R>) => Observable<any>,
 *   subjectSelector?: () => Subject<R>,
 * ): OperatorFunction<T, GroupedObservable<K, R>>
 */

import { interval, BehaviorSubject } from 'rxjs'
import { take, groupBy, mergeMap, map, reduce, tap } from 'rxjs/operators'

// keySelector
interval(300)
  .pipe(
    take(10),
    groupBy(x => Math.random() < 0.7),
    mergeMap(groupedObservable =>
      groupedObservable.key === true
        ? groupedObservable.pipe(map(x => `당첨!! ${x}`))
        : groupedObservable.pipe(map(x => `꽝!! ${x}`)),
    ),
  )
  .subscribe(res => console.log(res))

/**
  result:
  여러개의 키를 생성해 여러개의 그룹을 만들 수 있다.
  이 옵저버블 인스턴스 내부 this.key에 키를 저장한다.

  당첨!! 0
  당첨!! 1
  꽝!! 2
  꽝!! 3
  꽝!! 4
  당첨!! 5
  당첨!! 6
  당첨!! 7
  당첨!! 8
  당첨!! 9
 */

// elementSelector
/**
 * elementSelector는 keySelector로 생선한 groupedObservable 인스턴스에 전달하는 값을 바꿔준다.
 */
interval(500)
  .pipe(
    take(10),
    groupBy(
      x => Math.random() < 0.7,
      x => `${x}-${x % 2 === 0 ? '짝수' : '홀수'}`,
    ),
    mergeMap(groupedObservable =>
      groupedObservable.key === true
        ? groupedObservable.pipe(map(x => `당첨!! ${x}`))
        : groupedObservable.pipe(map(x => `꽝!! ${x}`)),
    ),
  )
  .subscribe(res => console.log(res))
/**
  result:
  참고로 keySelector 함수는 elementSelector 함수에서 리턴하는 값이 아닌 소스 옵저버블에서 발행하는 값을 기준으로 삼는다.
  elementSelector 함수에서 리턴하는 값은 groupedObservable에 전달하려는 용도의 값(element)이다.

  당첨!! 0-짝수
  당첨!! 1-홀수
  당첨!! 2-짝수
  꽝!! 3-홀수
  당첨!! 4-짝수
  꽝!! 5-홀수
  당첨!! 6-짝수
  당첨!! 7-홀수
  꽝!! 8-짝수
  당첨!! 9-홀수
 */

// durationSelector
/**
 * groupedObservable을 사용하는 함수이며 여기서 리턴하는 옵저버블은 키에 해당하는 새 groupedObservable을 발행한다.
 * 여기서 어쩐 값이든 발행하는 시점에 키와 groupedObservable의 매핑을 끊고 complete 함수를 호출해 groupedObservable의 구독을 완료한다.
 * 이때 durationSelector 함수에서 리턴한 옵저버블의 구독도 완료한다.
 *
 * 이후 같은 키에 해당하는 값을 소스 옵저버블에서 발행하면 키에 관한 매핑이 없으므로
 * durationSelector 함수에서 리턴하는 옵저버블을 새로 매핑해 구독한다.
 */
interval(500)
  .pipe(
    take(10),
    groupBy(
      x => Math.random() < 0.7,
      x => `${x} - ${x % 2 === 0 ? '짝수' : '홀수'}`,
    ),
    mergeMap(groupedObservable =>
      groupedObservable.key === true
        ? groupedObservable.pipe(
            map(x => `당첨!!: (${x})`),
            reduce<string, string[]>((acc, cur) => [...acc, cur], []),
          )
        : groupedObservable.pipe(
            map(x => `꽝!! (${x})`),
            reduce<string, string[]>((acc, cur) => [...acc, cur], []),
          ),
    ),
  )
  .subscribe(res => console.log(res))

/**
  result:
  reduce 연산자의 경우 소스 옵저버블의 값을 계속 누적하다나 complete 함수를 호출하는 시점에 누적한 최종 값 하나만 발행한다.
  위 예제의 경우 10번 값을 발행하는 시간인 5초를 기다려야 최종 결과를 확힌할 수 있다.

  [ '당첨!!: (0 - 짝수)',
  '당첨!!: (1 - 홀수)',
  '당첨!!: (2 - 짝수)',
  '당첨!!: (3 - 홀수)',
  '당첨!!: (4 - 짝수)',
  '당첨!!: (5 - 홀수)',
  '당첨!!: (6 - 짝수)' ]
  [ '꽝!! (7 - 홀수)', '꽝!! (8 - 짝수)', '꽝!! (9 - 홀수)' ]
 */

interval(500)
  .pipe(
    take(10),
    groupBy(
      x => Math.random() < 0.7,
      x => `${x} - ${x % 2 === 0 ? '짝수' : '홀수'}`,
      groupedObservable =>
        groupedObservable.key === true
          ? interval(600).pipe(tap(x => console.log(`당첨 duration ${x}`)))
          : interval(2000).pipe(tap(x => console.log(`꽝 duration ${x}`))),
    ),
    mergeMap(groupedObservable =>
      groupedObservable.key === true
        ? groupedObservable.pipe(
            map(x => `당첨!! (${x})`),
            reduce<string, string[]>((acc, cur) => [...acc, cur], []),
          )
        : groupedObservable.pipe(
            map(x => `꽝!! (${x})`),
            reduce<string, string[]>((acc, cur) => [...acc, cur], []),
          ),
    ),
  )
  .subscribe(res => console.log(res))

/**
  result:
  durationSelector 함수에서 값을 발행하는 옵저버블을 리턴하는데, 이때마다 결과를 한번 묶어서 출력하고,
  groupedObservable을 새로 생성해 구독한다.
  일정 주기마다 새로 그룹을 묶어야하는 필요가 있을 때 사용하는 함수가 durationSelector이다.

  당첨 duration 0
  [ '당첨!! (0 - 짝수)' ]
  당첨 duration 0
  [ '당첨!! (2 - 짝수)', '당첨!! (3 - 홀수)' ]
  꽝 duration 0
  [ '꽝!! (1 - 홀수)', '꽝!! (4 - 짝수)' ]
  당첨 duration 0
  [ '당첨!! (5 - 홀수)' ]
  당첨 duration 0
  [ '당첨!! (7 - 홀수)', '당첨!! (8 - 짝수)' ]
  [ '꽝!! (6 - 짝수)' ]
  [ '당첨!! (9 - 홀수)' ]
 */

// subjectSelector
/**
 * 멀티캐스팅에 대한 서브젝트 개념은 아직 공부하지 않았으므로 코드로 이해한다.
 */
interval(500)
  .pipe(
    take(10),
    groupBy(
      x => Math.random() < 0.7,
      x => `${x} - ${x % 2 === 0 ? '짝수' : '홀수'}`,
      groupedObservable =>
        groupedObservable.key === true
          ? interval(600).pipe(tap(x => console.log(`당첨 duration ${x}`)))
          : interval(2000).pipe(tap(x => console.log(`꽝 duration ${x}`))),
      () => new BehaviorSubject('GROUP START'),
    ),
    mergeMap(groupedObservable =>
      groupedObservable.key === true
        ? groupedObservable.pipe(
            map(x => `당첨!! (${x})`),
            reduce<string, string[]>((acc, cur) => [...acc, cur], []),
          )
        : groupedObservable.pipe(
            map(x => `꽝!! (${x})`),
            reduce<string, string[]>((acc, cur) => [...acc, cur], []),
          ),
    ),
  )
  .subscribe(res => console.log(res))
/**
  result:
  subjectSelector 함수는 rxjs에서 제공하는 서브젝트 타입의 인스턴스를 리턴할 수 있는 함수다.
  BehaviorSubject는 초기값을 인자로 사용할 수 있다.

  groupBy 연산자는 groupedObservable을 구독할 때 매핑하는 서브제트도 같이 구독하며,
  이 서브젝트에서 발행하는 값을 groupedObservable로 전달한다.
  BehaviorSubject는 최초 구독 시점에 초깃값을 발행하므로 당첨이든 꽝이든 초깃값으로 GROUP START를 발행한다.

  당첨 duration 0
  [ '당첨!! (GROUP START)', '당첨!! (0 - 짝수)' ]
  당첨 duration 0
  [ '당첨!! (GROUP START)', '당첨!! (3 - 홀수)' ]
  꽝 duration 0
  [ '꽝!! (GROUP START)',
    '꽝!! (1 - 홀수)',
    '꽝!! (2 - 짝수)',
    '꽝!! (4 - 짝수)' ]
  당첨 duration 0
  [ '당첨!! (GROUP START)', '당첨!! (5 - 홀수)', '당첨!! (6 - 짝수)' ]
  당첨 duration 0
  [ '당첨!! (GROUP START)', '당첨!! (7 - 홀수)' ]
  [ '꽝!! (GROUP START)', '꽝!! (8 - 짝수)', '꽝!! (9 - 홀수)' ]
 */

/**
 * keySelector 함수로 계산한 키에 해당하는 값을 발행할 소스옵저버블이 존재하지 않을 때 옵저버블의 값을 전달한다.
 * 이때 소스 옵저버블에서 발행하는 값을 언제 해당 옵저버블로 전달하는지 의문일 수 있는데,
 *
 * 최초 키에 해당하는 옵저버블은 처리를 완료한 후 소스 옵저버블의 값을 전달한다.
 * 따라서 처음 옵저버블이 발행한 값을 전달받아 이를 처리하는 단계에서 구독한다면
 * 그룹에 해당하는 옵저버블을 구독하기 전에 값을 전달받는 일은 발생하지 않는다.
 * (TODO: 이부분 이해 잘 안감...)
 */
