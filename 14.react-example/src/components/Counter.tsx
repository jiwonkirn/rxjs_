import React, { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState<number>(0)

  function handleCount(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    const counterType = (e.target as HTMLButtonElement).getAttribute('data-counter-type')
    if (counterType === 'increment') {
      setCount(prev => prev + 1)
      return
    }
    setCount(prev => (prev === 0 ? prev : prev - 1))
  }
  return (
    <>
      <div>
        <button data-counter-type="decrement" onClick={handleCount}>
          감소
        </button>
        <button data-counter-type="increment" onClick={handleCount}>
          증가
        </button>
      </div>
      <div>{count}</div>
    </>
  )
}
