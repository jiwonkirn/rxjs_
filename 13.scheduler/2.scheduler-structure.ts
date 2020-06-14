// 스케줄러 구조

/**
 * 스케줄러는 schedule 함수를 호출해서 동작한다. (직접 호출하지 않는 경우는 내부에서 호출한다.)
 * schedule 함수는 액션 객체를 생성해 해당 액션을 실행한다.
 * 스케줄러는 액션에 상태 값을 전달하는 역할을 하고 액션은 스케줄러의 작업 단위다.
 */

// 내부 구현 일부
class Scheduler {
  constructor(SchedulerAction, new = Scheduler.now) {
    // ...
  }

  schedule(work, delay = 0, state) {
    return new this.SchedulerAction(this, work).schedule(state, delay)
  }
}
