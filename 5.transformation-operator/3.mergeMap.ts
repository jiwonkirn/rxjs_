// mergeMap 연산자

/**
 * mergeMap 연산자는 Observable 인스턴스를 리턴하는 project 함수를 인자로 사용해 여기서 리턴된 인스턴스를 구독하는 map 연산자라고 할 수 있다.
 * map 연산자도 Observable 객체를 리턴할 수 있지만
 * mergeMap을 사용하면 project 함수에서 리턴하는 Observable 객체를 구독*해 값을 각각 발행할 수 있다.
 */

import { timer, range } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import fetch from 'node-fetch'

// const requests = [
//   timer(Math.floor(Math.random() * 2000)).pipe(map(v => 'req1')),
//   timer(Math.floor(Math.random() * 1000)).pipe(map(v => 'req2')),
//   timer(Math.floor(Math.random() * 1500)).pipe(map(v => 'req3')),
// ]

// range(0, 3).pipe(mergeMap(x => requests[x])).subscribe(v => console.log(`response from ${v}`))

/**
  result:
  response from req2
  response from req1
  response from req3
 */


/**
 * 배열, 유사배열
 * project 함수가 배열을 리턴하면 배열의 길이만큼 순회하며 next 함수로 값을 순회하며 next 함수로 값을 발행한 후
 * complete 함수를 호출한다.
 * project에서 리턴하는 객체를 구독할 때믄 subscribeToResult 라는 함수를 사용하는데,
 * 배열의 경우 length의 type이 number 타입이면 배열인것으로 간주한다.
 */
// range(0, 3).pipe(mergeMap(x => [x + 1, x + 2, x + 3, x + 4]))
//   .subscribe(
//     v => console.log(`current value ${v}`),
//     error => console.log(`error: ${error.message}`),
//     () => console.log(`complete!`)
//   )
/**
  result:
  current value 1
  current value 2
  current value 3
  current value 4
  current value 2
  current value 3
  current value 4
  current value 5
  current value 3
  current value 4
  current value 5
  current value 6
  complete!
 */


 /**
  * 프로미스
  * 프로미스를 사용할 수 있으며, 별도로 옵저버블로 변환해줄 필요가 없다.
  */
// range(0, 3).pipe(mergeMap(
//   v => new Promise(res => setTimeout(() => res(`req${v + 1}`), Math.floor(Math.random() * 2000)))
// )).subscribe(v => console.log(`response from ${v}`))

/**
  result:
  response from req3
  response from req2
  response from req1
 */


/**
 * 이터러블
 * subscribeToResult 함수레서 타입을 검사할 때 배열(혹은 유사배열)과 이터러블 검사 중 isArrayLike을 먼저 검사한다.
 * 따라서 이터러블로 분류한 객체도 project 함수에서 다룰 수 있다.
 */
// range(0, 3).pipe(mergeMap(v => {
//   const nextMap = new Map()
//   nextMap.set('original', v)
//   nextMap.set('plusOne', v + 1)
//   return nextMap
// })).subscribe(entry => {
//   const [key, value] = entry
//   console.log(`key is ${key}, value is ${value}.`)
// })

/**
  result:
  key is original, value is 0.
  key is plusOne, value is 1.
  key is original, value is 1.
  key is plusOne, value is 2.
  key is original, value is 2.
  key is plusOne, value is 3.
 */


/**
 * concurrent
 * mergeMap에서 새롭게 return하는 옵저버블이 너무 많을 수 있기 때문에 concurrent 매개변수로 제어할 수 있다.
 * mergeMap 연산자에서 구독 완료하지 않은 옵저버블 수가 concurrent 개수만큼이라면 해당 값을 연산자 내부에 구현한 버퍼에 잠시 저장해둔다.
 * 옵저버블중 하나라도 구독을 해제한다면 버퍼에 저장한 순서대로 값을 하나씩 꺼내서 project 함수에서 ㅅ 옵저버블을 만들어 구독한다.
 * 서버와 통신할 때 한번에 너무 많은 요청을 하지 않으면서 최대 효율을 낼 때 유용하다.
 */
interface Res {
  args: unknown[]
  url: string
}

const colors = [
  'blue', 'red', 'black', 'yellow', 'green',
  'brown', 'gray', 'purple', 'gold', 'white'
]

const concurrent = 5
const maxDelayInSecs = 6
console.time('request_color')

range(0, colors.length).pipe(
  mergeMap(colorIndex => {
      const currentDelay = Math.floor(Math.random() * maxDelayInSecs)
      console.log(`[Request Color]: ${colors[colorIndex]}, currentDelay: ${currentDelay}`)
      return fetch(`https://httpbin.org/delay/${currentDelay}?color_name=${colors[colorIndex]}`)
                .then((res) => res.json())
    }, concurrent)
).subscribe(
  (res: Res) => console.log(`<Response> args: ${JSON.stringify(res.args)}, url: ${res.url}`),
  console.error,
  () => {
    console.log('complete')
    console.timeEnd('request_color')
  }
)
/**
  result:
  [Request Color]: blue, currentDelay: 1
  [Request Color]: red, currentDelay: 4
  [Request Color]: black, currentDelay: 2
  [Request Color]: yellow, currentDelay: 4
  [Request Color]: green, currentDelay: 3
  
  blue 응답받은 후 brwon 요청
  <Response> args: {"color_name":"blue"}, url: https://httpbin.org/delay/1?color_name=blue
  [Request Color]: brown, currentDelay: 5

  black 응답받은 후 gray 요청
  <Response> args: {"color_name":"black"}, url: https://httpbin.org/delay/2?color_name=black
  [Request Color]: gray, currentDelay: 5

  green 응답받은 후 purple 요청
  <Response> args: {"color_name":"green"}, url: https://httpbin.org/delay/3?color_name=green
  [Request Color]: purple, currentDelay: 1

  yellow 응답받은 후 gold 요청
  <Response> args: {"color_name":"yellow"}, url: https://httpbin.org/delay/4?color_name=yellow
  [Request Color]: gold, currentDelay: 3

  red 응답받은 후 white 요청
  <Response> args: {"color_name":"red"}, url: https://httpbin.org/delay/4?color_name=red
  [Request Color]: white, currentDelay: 3
  
  나머지 응답
  <Response> args: {"color_name":"purple"}, url: https://httpbin.org/delay/1?color_name=purple
  <Response> args: {"color_name":"brown"}, url: https://httpbin.org/delay/5?color_name=brown
  <Response> args: {"color_name":"gray"}, url: https://httpbin.org/delay/5?color_name=gray
  <Response> args: {"color_name":"gold"}, url: https://httpbin.org/delay/3?color_name=gold
  <Response> args: {"color_name":"white"}, url: https://httpbin.org/delay/3?color_name=white
  complete
  request_color: 8578.627ms
 */
