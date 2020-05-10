// defaultEmpty

/**
 * defaultEmpty는 소스 옵저버블이 empty 함수로 생성한 옵저버블일 때 인자로 설정한 기본값을 발행해주는 연산자다.
 */
import { range } from 'rxjs'
import { defaultIfEmpty } from 'rxjs/operators'

const getRangeObservable = count => range(1, count)

function subscribeWithDefaultIfEmpty(count) {
  getRangeObservable(count)
    .pipe(defaultIfEmpty(Infinity))
    .subscribe(v => console.log(`개수(count): ${count}, 값(value): ${v}`))
}

subscribeWithDefaultIfEmpty(0)
subscribeWithDefaultIfEmpty(3)

/**
  result:
  소스 옵저버블애서 발행하는 값이 없으므로 Infinity를 출력

  개수(count): 0, 값(value): Infinity
  개수(count): 3, 값(value): 1
  개수(count): 3, 값(value): 2
  개수(count): 3, 값(value): 3
 */
