import { interval } from 'rxjs'
import { filter } from 'rxjs/operators'

let divisor = 2
setInterval(() => {
  divisor = (divisor + 1) % 10
}, 500)

interval(700)
  .pipe(filter((value) => value % divisor === 0))
  .subscribe((value) => console.log(value))
  