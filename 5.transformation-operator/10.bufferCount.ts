// bufferCount

/**
 * 값 각각을 옵저버블 스트림으로 전달할 때 이를 일정 개수만큼 묶은 후 서버에 한 번의 요청을 하는 상황이 있을 수 있다.
 * 혹은 묶은 값을 풀어서 처리해야한다면 bufferCount 연산자가 유용하다.
 */
import { interval, from } from 'rxjs'
import { take, map, bufferCount, filter } from 'rxjs/operators'

const message = '안녕하세요. RxJS 테스트 입니다.'

// interval(90)
//   .pipe(
//     take(message.length),
//     map(x => {
//       const character = message.charAt(x)
//       console.log(character)
//       return character
//     }),
//     bufferCount(5),
//   )
//   .subscribe(res => console.log(`buffer: [${res}]`))
/**
  result:
  bufferCount 연산자는 buffer 연산자와는 다르게 버퍼에 저장한 값이 있으면 complete 함수를 호출해도 발행한다.

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
  buffer: [S, ,테,스,트]

  입
  니
  다
  .
  buffer: [ ,입,니,다,.]
 */

// startBufferEvery 파라미터
/**
 * startBufferEvery는 얼마나 버버의 공간을 시프트하여 확보할 것인지에 대한 number값을 받는다.
 */
const message2 = '간장공장공장장은강공장장이고공공장공장장은장공장장이다.'
const targetWord = '공장장'

from(message2)
  .pipe(
    bufferCount(targetWord.length, 1),
    filter(buffer => buffer.length === targetWord.length),
    map(buffer => {
      const bufferedWord = buffer.join('')
      console.log(bufferedWord)
      return bufferedWord
    }),
    filter(word => word === targetWord),
  )
  .subscribe(word => console.log(`${word} 발견!`))
/**
  result:
  버퍼 공간을 1개씩만 시프트하여 연속된 3개의 글자를 모두 확인하는 코드이다.
  (사이즈3 슬라이딩 윈도우)

  간장공
  장공장
  공장공
  장공장
  공장장
  공장장 발견!
  장장은
  장은강
  은강공
  강공장
  공장장
  공장장 발견!
  장장이
  장이고
  이고공
  고공공
  공공장
  공장공
  장공장
  공장장
  공장장 발견!
  장장은
  장은장
  은장공
  장공장
  공장장
  공장장 발견!
  장장이
  장이다
  이다.
 */
