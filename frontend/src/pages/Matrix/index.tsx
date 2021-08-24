// Libraries
import { useRef, useState } from 'react'

// Components
import Button from 'components/Button'

// Styles
import './Matrix.scss'

// Task 1 Function
import clockwiseMatrix from './clockwiseMatrix'

// For the reviewers.
declare global {
  interface Window {
    clockwiseMatrix: (input: string) => string;
  }
}
window.clockwiseMatrix = clockwiseMatrix

const MatrixPage = () => {
  // State
  const [output, setOutput] = useState('')
  const [error, setError] = useState(false)

  // Refs
  const textarea = useRef<HTMLTextAreaElement>(null)

  const handleClick = () => {
    try {
      setOutput(clockwiseMatrix(textarea.current?.value ?? ''))
      setError(false)
    } catch (exception) {
      setOutput(exception.message)
      setError(true)
    }
  }

  return (
    <div className='MatrixPage'>
      <div>
        <label htmlFor='matrix-value'>Input</label>
        <textarea id='matrix-value' ref={textarea} placeholder={
          `[ 1, 2, 3, 4]
[ 5, 6, 7, 8]
[ 9,10,11,12]
[13,14,15,16]`} />
      </div>

      <div>
        <label htmlFor='output'>Output</label>
        <span className={error ? 'MatrixPage--error' : ''}>{output}</span>
      </div>

      <Button onClick={handleClick}>Unwind Matrix</Button>
    </div>
  )
}

export default MatrixPage
