import { range } from 'rxjs'
import { filter } from 'rxjs/operators'

// filter가 반환하는 MonoTypeOperatorFunction<T>는 pipe함수가 호출하여 Observable instance를 얻는다.
range(1, 5).pipe(
  filter((x) => x % 2 === 0)
).subscribe(
  x => console.log(`result: ${x}`),
  error => console.log(`error.message: ${error.message}`),
  () => console.log(`complete`)
)

/**
  result: 2
  result: 4
  complete
*/
