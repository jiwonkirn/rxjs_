import { from } from 'rxjs'

console.log('START!')

const promise1 = new Promise((res, rej) => {
  console.log(`promise1 start`)
  setTimeout(() => res(`RESOLVE - promise1 resolve`), 700)
  console.log(`promise1 end`)
})

const promise2 = new Promise((res, rej) => {
  console.log(`promise2 start`)
  setTimeout(() => rej(`REJECT - promise2 rejected`), 1300)
  console.log(`promise2 end`)
})

new Promise((res) => {
  console.log(`promise3 start`)
  res(1)
  console.log(`promise3 end`)
}).then(console.log)

from(promise1).subscribe(
  (v) => console.log(`[1] next: ${v}`),
  (e) => console.log(`[1] error: ${e}`),
  () => console.log(`[1] promise1 completed`)
)

from(promise2).subscribe(
  (v) => console.log(`[2] next: ${v}`),
  (e) => console.log(`[2] error: ${e}`),
  () => console.log(`[2] promise2 completed`)
)

console.log('END!')

/**
  START!
  promise1 start
  promise1 end
  promise2 start
  promise2 end
  promise3 start
  promise3 end
  END!
  1
  [1] next: RESOLVE - promise1 resolve
  [1] promise1 completed
  [2] error: REJECT - promise2 rejected

  발행할 여러개의 값을 of함수의 인자로 나열하여 사용한다면 두번째 인자가 스케줄러가 아니면 에러가 발생할 수 있다.
*/


