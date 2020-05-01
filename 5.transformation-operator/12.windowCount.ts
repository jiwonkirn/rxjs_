// windowCount
/**
 * windowSize는 설정된 숫자만큼 중첩한 옵저버블 각각의 값을 발행하며
 * 두번째 startWindowEvery는 설정한 값만큼 건너뛰며 중첩 옵저버블 각각의 값을 발행한다.
 */

import { interval } from 'rxjs'
import { take, map, windowCount, concatMap, filter, scan, last, mergeMap, defaultIfEmpty } from 'rxjs/operators'

const message = '안녕하세요. RxJS 테스트 입니다'

interval(90)
  .pipe(
    take(message.length),
    map(x => {
      const character = message.charAt(x)
      console.log(character)
      return character
    }),
    windowCount(5),
    concatMap(windowObservable => {
      console.log('windowObservable 넘어옴')
      return windowObservable.pipe(
        filter(x => x != ' '),
        take(3),
        scan((acc, cur) => acc + cur, ''),
        last(),
      )
    }),
  )
  .subscribe(res => console.log(`result: ${res}`))
/**
  result:
  인자로 넘어간 숫자만큼 정확한 개수 단위로 구간을 나눈다.

  windowObservable 넘어옴
  안
  녕
  하
  result: 안녕하
  세
  요
  windowObservable 넘어옴
  .

  R
  x
  result: .Rx
  J
  windowObservable 넘어옴
  S

  테
  스
  result: S테스
  트
  windowObservable 넘어옴

  입
  니
  다
  result: 입니다
 */

// windowCount 연산자에서 windowObservable의 값 발행
/**
 * startWindowEvery 파라미터를 사용하면 소스 옵저버블에서 값을 발행할 때 인자로 설정한 수만큼
 * 새 windowObservable을 발행한다.
 * windowObservable 각각은 발행한 시점부터 소스 옵저버블에서 windowSize 수만큼 값을 전달받고 구독을 완료한다.
 */
const message2 = '간장공장공장장은강공장장이고공공장공장장은장공장장이다'
const targetWord = '공장장'

interval(10)
  .pipe(
    take(message2.length),
    map(charIndex => {
      const character = message2.charAt(charIndex)
      console.log(character)
      return character
    }),
    windowCount(targetWord.length, 1),
    mergeMap(windowObservable => {
      console.log('windowObservable 넘어옴')
      return windowObservable.pipe(
        defaultIfEmpty('empty'),
        scan((acc, cur) => (cur === 'empty' ? cur : acc + cur), ''),
        last(),
      )
    }),
    filter(word => {
      if (typeof word === 'string') {
        console.log(`현재단어: ${word}`)
        return word === targetWord
      }
      return false
    }),
  )
  .subscribe(word => console.log(`${word} 발견`))
/**
  result:

  windowObservable 넘어옴
  간
  windowObservable 넘어옴
  장
  windowObservable 넘어옴
  공
  현재단어: 간장공
  windowObservable 넘어옴
  장
  현재단어: 장공장
  windowObservable 넘어옴
  공
  현재단어: 공장공
  windowObservable 넘어옴
  장
  현재단어: 장공장
  windowObservable 넘어옴
  장
  현재단어: 공장장
  공장장 발견
  windowObservable 넘어옴
  은
  현재단어: 장장은
  windowObservable 넘어옴
  강
  현재단어: 장은강
  windowObservable 넘어옴
  공
  현재단어: 은강공
  windowObservable 넘어옴
  장
  현재단어: 강공장
  windowObservable 넘어옴
  장
  현재단어: 공장장
  공장장 발견
  windowObservable 넘어옴
  이
  현재단어: 장장이
  windowObservable 넘어옴
  고
  현재단어: 장이고
  windowObservable 넘어옴
  공
  현재단어: 이고공
  windowObservable 넘어옴
  공
  현재단어: 고공공
  windowObservable 넘어옴
  장
  현재단어: 공공장
  windowObservable 넘어옴
  공
  현재단어: 공장공
  windowObservable 넘어옴
  장
  현재단어: 장공장
  windowObservable 넘어옴
  장
  현재단어: 공장장
  공장장 발견
  windowObservable 넘어옴
  은
  현재단어: 장장은
  windowObservable 넘어옴
  장
  현재단어: 장은장
  windowObservable 넘어옴
  공
  현재단어: 은장공
  windowObservable 넘어옴
  장
  현재단어: 장공장
  windowObservable 넘어옴
  장
  현재단어: 공장장
  공장장 발견
  windowObservable 넘어옴
  이
  현재단어: 장장이
  windowObservable 넘어옴
  다
  현재단어: 장이다
  windowObservable 넘어옴
  현재단어: 이다 <- 값을 적게 배출하는 경우가 있다.
  현재단어: 다
  현재단어: empty <- 이다{observable} <- 요 상황때문에 빈값이 발행된다.
 */
