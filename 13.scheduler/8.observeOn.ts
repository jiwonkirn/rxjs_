// observeOn 연산자

/**
 * subscribeOn 연산자를 사용하면 모든 스트림이 해당 스케줄러로 바뀐다.
 * 중간에 다른 스케줄러로 바꿔주고 싶을 때 observeOn이 호출하면 이후부터 스케줄러를 바꿔 실행할 수 있다.
 * 이 연산자는 마지막에 호출된 연산자의 스케줄러가 우선 적용된다.
 *
 * observeOn은 위에서 아래로 적용되며 여러번 호출해 연산자별로 다른 스케줄러를 사용할 수 있게 돕는다.
 */
// import { Observable, asyncScheduler } from 'rxjs'
// import { observeOn } from 'rxjs/operators'

// const source$ = Observable.create(observer => {
//   console.log('BEGIN source')
//   observer.next(1)
//   observer.next(2)
//   observer.next(3)
//   observer.complete()
//   console.log('END source')
// })

// console.log('before subscribe')
// source$.pipe(observeOn(asyncScheduler, 1000)).subscribe(console.log)
// console.log('after subscribe')
/**
  result:
  observeOn 연산자 이후의 부분만 1초 뒤에 실행된다.
  만약 뒤에 map, filter 연산자가 있다면 해당 map, filter연산자는 1초 뒤에 실행된다.

  before subscribe
  BEGIN source
  END source
  after subscribe
  1
  2
  3
 */

// observeOn 연산자 안 AsyncScheduler 사용
/**
 * observeOn연산자는 소스 옵저버블을 구독하는 동작 하나만 스케줄러에서 실행한다.
 * 하지만 observeOn연산자는 스케줄러에서 next 함수로 여러 값을 전달하는 동작을 담당한다.
 */
// import { of, asyncScheduler } from 'rxjs'
// import { observeOn } from 'rxjs/operators'

// console.log('start')
// of(1, 2, 3).pipe(observeOn(asyncScheduler, 1000)).subscribe(console.log)
// console.log(`actions length: : ${asyncScheduler.actions.length}`)
// console.log('end')
// /**
//   result:

//   start
//   actions length: : 0
//   end
//   1
//   2
//   3
//  */

// observeOn 연산자 안 AsapScheduler 사용
/**
 * AsapScheduler는 스케줄러의 schedule 함수를 호출할 때마다 스케줄러에 있는 actions 배열에 액션을 푸시한다.
 * next 함수를 호출할 때마다 setInterval 함수도 매번 호출하지만 AsapScheduler는 스케줄러 안에 있는 actions 배열에 해당 액션을 푸시하는 동작만 한다.
 * 동기 처리가 끝나면 비동기로 actions 배열에 전달한 액션들을 반복 실행시킨다.
 */

// import { of, asapScheduler } from 'rxjs'
// import { observeOn } from 'rxjs/operators'

// console.log('start')
// of(1, 2, 3).pipe(observeOn(asapScheduler)).subscribe(console.log)
// console.log(`actions.length: ${asapScheduler.actions.length}`)
// console.log('end')
/**
  result:
  complete까지 총 4개이다.
  actions 배열의 4개 액션은 동기 방식으로 푸시히며
  1 ~ 3 출력 부분은 마이크로 큐에서 비동기로 실행된다.

  start
  actions.length: 4
  end
  1
  2
  3
 */

// observeOn 연산자 안 QueueScheduler 사용
/**
 * QueueScheduler는 동기 방식으로 동작한다. 따라서 구독 전과 후를 구분하는 출력코드를 넣었을 때 모든 동작을 완료한 후 구독 후 코드를 출력한다.
 * 또한 재귀로 동작하는 것이 아니고 별개의 액션을 만들어 1개 액션만 각각 동기 방식으로 실행된다.
 *
 * schedule 함수를 직접 호출해서 재귀 실행하면 꼬리 재귀 같은 형태가 되며 반복 실행 내부에 추가할 동작을 actions 배열에 넣을 수 있다.
 * 즉 동기 동작과 다를 것이 없다.
 */

// import { of, queueScheduler } from 'rxjs'
// import { observeOn } from 'rxjs/operators'

// console.log('start')
// of(1, 2, 3).pipe(observeOn(queueScheduler)).subscribe(console.log)
// console.log(`actions length: ${queueScheduler.actions.length}`)
// console.log('end')
/**
  result:

  start
  1
  2
  3
  actions length: 0
  end
 */

/**
 * 스케줄러를 of나 range 함수 안에 포함시키면 스케줄러를 재귀실행시킨다.
 * 이때는 큐에 순서를 넣어 제어할 수 있다.
 */
import { range, queueScheduler } from 'rxjs'
import { mergeMap, observeOn } from 'rxjs/operators'

console.log('start queue')
range(0, 3, queueScheduler)
  .pipe(
    mergeMap(x => {
      console.log('here', x)
      return range(x, 3, queueScheduler)
    }),
  )
  .subscribe(console.log)
console.log('end queue')

console.log('start without queue')
range(0, 3)
  .pipe(mergeMap(x => range(x, 3)))
  .subscribe(console.log)
console.log('end without queue')
/**
  result:

  start queue
  0
  1
  1
  2
  2
  2
  3
  3
  4
  end queue
  start without queue
  0
  1
  2
  1
  2
  3
  2
  3
  4
  end without queue
 */
/**
 * 처음엔 0 배출
 * 012 중에 0 나옴
 *
 * 다음 1 배출
 * 012 중에 1 나옴
 * 123 중에 1 나옴
 *
 * 다음 2 배출
 * 012 중에 2 나옴 (종료)
 * 123 중에 2 나옴
 * 234 중에 2 나옴
 *
 * 123 중에 3나옴 (종료)
 * 234 중에 3나옴
 *
 * 234 중에 4나옴 (종료)
 */
