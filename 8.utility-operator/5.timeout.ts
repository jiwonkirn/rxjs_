// timeout

/**
 * timeout은 일정 시간동안 소스 옵저버블에서 값을 발행하지 않으면 에러를 발생시키는 연산자다.
 * 서버에 어떤 요청을 하거나 상환에 따라 기대한 시간보다 오래걸릴 수 있는 작업에 옵저버블을 사용해야 할 때 유용하다.
 */
import { defer } from 'rxjs'
import { timeout } from 'rxjs/operators'
import fetch from 'node-fetch'

const source$ = defer(() => fetch(`https://httpbin.org/delay/${Math.floor(Math.random() * 5)}`).then(x => x.json()))

source$.pipe(timeout(2000)).subscribe(
  x => console.log(`${JSON.stringify(x)}`),
  err => {
    console.log(`${err}`)
    process.exit(1)
  },
)
/**
  result:

  타임아웃 에러가 발생한 경우:
  TimeoutError: Timeout has occurred

  타임아웃 에러가 발생하지 않은 경우:
  {"args":{},"data":"","files":{},"form":{},"headers":{...},"origin":"180.83.50.216","url":"https://httpbin.org/delay/0"}
 */
