// AsyncScheduler

/**
 * AsyncScheduler는 대표 스케줄러들이 상속받는 부모 스케줄러라고 할 수 있다.
 * 각 작업 단위 기준으로 보면 setTimeout 함수처럼 일회성으로 일정 시간 후 정의한 작업을 동작시키는 스케줄러다.
 *
 * AsyncScheduler를 보면 setTimeout 처럼 동작하지만 내부에서는 setInterval 함수를 두고 일정 간격마다 요청이 오는 작업을 해당 스케줄러 사용을 완료할 때까지 처리한다.
 * (schedule 함수를 재귀 호출 할 때를 고려해 setInterval 함수를 내부적으로 사용하는 것이다.)
 */

import { asyncScheduler } from 'rxjs'

asyncScheduler.schedule(function work(value: any) {
  value = value || 0
  console.log(`value: ${value}`)
  const selfAction = this
  selfAction.schedule(value + 1, 1000)
}, 1000)
/**
  result:
  selfAction는 AsyncAction의 인스턴스다. 즉 work 함수는 AsyncAction의 인스턴스에서 실행된다.
  만약 1초가 아닌 다른값으로 delay를 설정하는 경우 기존에 setInterval 함수로 동작하던 액션을 모두 실행한 후 clearInterval 함수로 해당 setInterval 함수를 초기화한다.
  그리고 새롭게 설정한 delay 값으로 setInterval 함수의 값을 설정해 work 함수를 실행한다.
  (setTimeout(deferredTask, 0)을 실행시키려면 AsapScheduler를 사용한다.)

  value: 0
  value: 1
  value: 2
  value: 3
  value: 4
  value: 5
  value: 6
  value: 7
  value: 8
  value: 9
  value: 10
 */
