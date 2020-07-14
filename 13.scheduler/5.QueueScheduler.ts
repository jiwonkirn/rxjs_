// QueueScheduler

/**
 * QueueScheduler는 동기 방식의 스케줄러이다. actions 배열을 반복 실행하며 먼저 들어온 값을 사용하는 큐 자료구조를 사용한다.
 * 큐를 사용해 순서를 동기로 조절해야하는 특수한 상황이 아닌 이상 실용성이 낮다.
 *
 * QueueScheduler는 동기방식이기 때문에 action 배열에 아직 실행해야하는 동작이 남아있는 경우 actions 배열 요소를 모두 실행할때까지 반복해서 동작한다.
 * 연산자 안에서 동기방식 및 콜스택이 아닌 반복문으로 꼬리 재귀를 호출해야 하거나 큐에 넣어 순서를 맞춰야 할 때 사용하면 좋다.
 */
import { queueScheduler } from 'rxjs'

interface State {
  index: number
  a: number
  b: number
}

const N = 6
queueScheduler.schedule<State>(
  function (stateProp) {
    const state = stateProp as State
    console.log(`fibonacci[${state.index}]: ${state.a}`)
    if (state.index < N) {
      this.schedule({
        index: state.index + 1,
        a: state.b,
        b: state.a + state.b,
      })
    }
  },
  undefined, // delay, 값을 설정할 경우 AsyncScheduler를 상속받아 동작한다.
  { index: 0, a: 0, b: 1 },
)
/**
  result:
  큐에서 하나씩 꺼내어 동기적으로 동작
  fibonacci[0]: 0
  fibonacci[1]: 1
  fibonacci[2]: 1
  fibonacci[3]: 2
  fibonacci[4]: 3
  fibonacci[5]: 5
  fibonacci[6]: 8
 */
