import { useState } from 'react'
import './App.css'

function App() {
  const [counter, setCounter] = useState<number>(0)
  return (
    <>
      <p>Local Counter in App: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Increase</button>

      <br />
    </>
  )
}
export default App
