// AsapScheduler

/**
 * AsapScheduler는 각 플랫폼에 맞게 동기로 작업을 처리한 후 가능하면 빠르게 비동기로 작업을 처리하는 스케줄러다.
 * RxJS 곰식문서 Scheduler Type에서는 스케줄러 타입으로 MessageChannel 인터페이스, setTimeout 함수 등 플랫폼에 따라 가장 적합한 것을 사용한다고 설명한다.
 *
 * 한가지 주의할 점은 AsapScheduler가 AsyncScheduler를 상속받을 때 0보다 큰 delay 값을 인자로 사용하는 상황이다.
 * super 키워드로 부모인 AsyncScheduler를 동작시키기 때문이다.
 * 반대로 말하면 delay에 설정한 값이 없거나 0일 때만 AsapScheduler가 동작한다고 할 수 있다.
 *
 * AsapScheduler가 동작할 때는 내부에 있는 setImmediate 함수를 이용해 플랫폼에 맞는 적절한 방식을 선택하여 비동기 동작을 구현한다.
 *
 * AsapScheduler 내부에는 여러 액션들을 담는 actions 배열이 있다. AsapAction의 schedule 함수를 호출할 때는 해당 액션 객체 자체를 스케줄러의 actions 배열에 푸시한다.
 */

/**
 * AsapScheduler의 구현 원리
 * AsapScheduler는 setImmediate 함수를 호출한 후 actions 배열에 있는 액션을 매번 꺼내 비동기 동작을 한다.
 * 그리고 work 함수를 호출할 때 해당 액션의 상태 값(state)을 전달해 동작을 실행한다.
 */

// AsapAction의 구현 코드 일부
/*
requestAsyncId(scheduler, id, delay = 0) {
  if (delay !== null && delay = 0) {
    return super.requestAsyncId(scheduler, id, delay)
  }
  scheduler.actions.push(this)
  return scheduler.sheduled || (
    scheduler.scheduled = Immediate.setImmediate(
      scheduler.flush.bind(scheduler, null)
    )
  )
}
*/

// 스케줄러의 actions 배열 사용 방식 (AsapScheduler의 flush)
/*
export class AsapScheduler extends AsyncScheduler {
  flush(action) {
    this.active = true
    this.scheduled = undefined
    const { actions } = this
    // ...
    action = action || action.shift()
    do {
      if (error = action.execute(action.state, action.delay)) {
        break
      }
    } while (++index < count && (action = action.shift()))
    // ...
  }
}
*/
import { of, asapScheduler } from 'rxjs'

console.log('start')
of(1, 2, 3, asapScheduler).subscribe(x => console.log(x))
console.log(`actions length: ${asapScheduler.actions.length}`)
console.log('end')
/**
  result:

  start
  actions length: 1
  end
  1
  2
  3
 */

console.log('start')
asapScheduler.schedule(function work(value: any) {
  value = value || 1
  console.log(value)
  var selfAction = this
  if (value < 3) {
    selfAction.schedule(value + 1)
  }
})
console.log(`actions length: ${asapScheduler.actions.length}`)
console.log('end')
/**
  result:
  of 함수를 이용한 재귀호출방식과 비슷하다.

  start
  actions length: 1
  end
  1
  2
  3
 */
