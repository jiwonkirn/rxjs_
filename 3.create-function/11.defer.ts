import { defer } from 'rxjs'

// defer는 팩토리 함수에서 return된 값들을 Observable로 만들어준다. (from에서 서용 가능한 값들)
// from은 promise를 즉시 생성하지만 defer는 구독하는 때에 생성한다.
const source$1 = defer(() => new Promise((res, rej) => {
  console.log('promise1 function begin')
  setTimeout(() => res('promise1 resolve'), 700)
  console.log('promise1 function end')
}))

console.log('source1$ created')

const source$2 = defer(() => new Promise((res, rej) => {
  console.log('promise2 function begin')
  setTimeout(() => rej(new Error('promise2 reject')), 1200)
  console.log('promise2 function end')
}))

console.log('source2$ created')
console.log('Before source1$.subscribe()')

source$1.subscribe(
  x => console.log(`[1] next: ${x}`),
  err => console.error(`[1] error.message: ${err.message}`),
  () => console.log(`[1] completed`)
)

console.log('After source1$.subscribe()')
console.log('Before source2$.subscribe()')

source$2.subscribe(
  x => console.log(`[2] next: ${x}`),
  err => console.error(`[2] error.message: ${err.message}`),
  () => console.log(`[2] completed`)
)

console.log('After source2$.subscribe()')

/*
source1$ created
source2$ created
Before source1$.subscribe()
promise1 function begin
promise1 function end
After source1$.subscribe()
Before source2$.subscribe()
promise2 function begin
promise2 function end
After source2$.subscribe()
[1] next: promise1 resolve
[1] completed
[2] error.message: promise2 reject
*/
