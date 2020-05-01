// buffer

/**
 * buffer는 소스 옵저버블에서 발행하는 값을 순서대로 일정 기준으로 묶어서 하나의 배열로 발행하는 연산자다.
 * 묶을 기준에 해당하는 시점에 배열을 만들어 발행하는 값들을 해당 배열에 쌓아둔 후,
 * 일전 조건을 충족했을 깨 쌓아둔 배열을 발행하고 다시 새로 배열에 쌓고 발행하는 일을 반복한다.
 */
import { interval } from 'rxjs'
import { take, map, buffer } from 'rxjs/operators'

const message = '안녕하세요. RxJS 테스트 입니다.'

interval(90)
  .pipe(
    take(message.length),
    map(x => {
      const character = message.charAt(x)
      console.log(character)
      return character
    }),
    buffer(interval(500)),
  )
  .subscribe(res => console.log(`buffer: [${res}]`))

/**
  result:
  complete함수를 호출하면 버퍼에 저장된 값들을 발행하지 않는다는 점을 주의해야한다.

  안
  녕
  하
  세
  요
  buffer: [안,녕,하,세,요]
  .

  R
  x
  J
  buffer: [., ,R,x,J]
  S

  테
  스
  트

  buffer: [S, ,테,스,트, ]
  입
  니
  다
  .
 */
