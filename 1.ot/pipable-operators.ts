import { range } from 'rxjs'
import { filter, map } from 'rxjs/operators'

range(1, 10)
  .pipe(
    filter((value) => value % 2 === 0),
    map((value) => value + 1)
  ).subscribe((val) => console.log(val))

