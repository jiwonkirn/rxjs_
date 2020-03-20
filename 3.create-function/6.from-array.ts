import { from } from 'rxjs'

from([1,2,3,4]).subscribe(
  (v) => console.log(`next ${v}`),
  null,
  () => console.log('completed')
)
