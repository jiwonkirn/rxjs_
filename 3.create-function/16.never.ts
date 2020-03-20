import { NEVER } from 'rxjs'

console.log(`Before subscribe()`)

// complete나 error함수도 없는 아무것도 하지 않는 상수이다.
// 아무것도 하지 않고 옵져버블을 만드려고 할 때 사용한다.
NEVER.subscribe(
  x => console.log(`next: ${x}`),
  error => console.log(`error.message: ${error.message}`),
  () => console.log(`completed`)
)

console.log(`After subscribe()`)

/**
  Before subscribe()
  After subscribe()
 */
