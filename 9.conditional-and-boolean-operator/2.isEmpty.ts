// isEmpty

/**
 * isEmpty는 true/false를 값으로 발행해 소스 옵저저블이 empty 옵저버블인지 아닌지를 알려주고 구독 롼료하는 연산자다.
 * defaultIfEmpty 연산자와는 다르게 소스 옵저버블이 empty 옵저버블이 아닐 때 원래 동작을 그대로 실행하지 않는다.
 *
 * 예를들어 에러가 발생할 때를 제외하고 소스 옵저버블에서 next나 complete 함수를 호출하면
 * 그 자리에서 empty 옵저버블인지만 확인해 true/false 값을 발행하고 구독을 완료한다.
 */
import { range } from 'rxjs'
import { isEmpty } from 'rxjs/operators'

const getRangeObservable = count => range(1, count)

function subscribeWithIsEmpty(count) {
  getRangeObservable(count)
    .pipe(isEmpty())
    .subscribe(value => console.log(`count: ${count}, value: ${value}`))
}

subscribeWithIsEmpty(0)
subscribeWithIsEmpty(3)

/**
  result:

  count: 0, value: true
  count: 3, value: false
 */
