import { throwError } from 'rxjs'

// error 함수를 실행시키고 옵져버블 구독을 완료한다.
throwError(new Error('throw error')).subscribe(
  x => console.log(`next: ${x}`),
  error => console.log(`error.message: ${error.message}`),
  () => console.log('complete')
)

/**
  error.message: throw error
*/
