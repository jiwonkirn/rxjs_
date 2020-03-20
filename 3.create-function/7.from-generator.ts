import { from } from 'rxjs'

console.log('hello')

function* forLoopGen(start, end, increment) {
  for (let i = start; i <= end;  i += increment) {
    yield i
  }
}

from(forLoopGen(1, 15, 2)).subscribe(
  (v) => console.log(`next ${v}`),
  null,
  () => console.log('completed')
)

console.log('end')
