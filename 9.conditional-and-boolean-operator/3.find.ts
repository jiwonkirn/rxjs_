// find

/**
 * find는 인지로 사용하는 preducate함수로 소스 옵저버블에서 발행하는 값 중 처음으로 함수 조건을 만족헀을 때 true를 발행하고 구독을 완료하는 연산자다.
 * 참고로 predicate 함수를 호출해 동작하는 중 에러가 발생히먄 error함수를 호출해 에러를 전달받는다.
 * 소스 옵저버블에서 애러가 발생해도 error함수로 에러를 전파한다.
 */
import { range } from 'rxjs'
import { find } from 'rxjs/operators'

const getRangeObservable = count => range(1, count)

function subscribeWithFindGreaterThan3(count) {
  getRangeObservable(count)
    .pipe(find(x => x > 3))
    .subscribe(value => console.log(`count: ${count}, find x > 3: ${value}`))
}

subscribeWithFindGreaterThan3(5)
subscribeWithFindGreaterThan3(1)
/**
  result:

  count: 5, find x > 3: 4
  count: 1, find x > 3: undefined
 */
