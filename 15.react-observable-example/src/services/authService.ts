export function fakeAuth(username: string, password: string): Promise<{ username: string }> {
  return new Promise(function (resolve, reject) {
    console.log(username, password)
    setTimeout(() => {
      if (username === 'foo') {
        if (password === 'bar') {
          return resolve({ username })
        }
        return reject(new Error('패스워드가 틀렸습니다.'))
      }
      return reject(new Error('없는 아이디입니다.'))
    }, 1000)
  })
}
