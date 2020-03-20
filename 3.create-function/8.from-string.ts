import { from } from 'rxjs'

from('hello').subscribe(
  (v) => console.log(`next: ${v}`),
  null,
  () => console.log('completed')
)

/**
  next: h
  next: e
  next: l
  next: l
  next: o
  completed
*/
