import { useState } from 'react'
import { Login } from './pages/login'
import { Flow } from './pages/flow'

function App() {
  const [count, setCount] = useState(0)

  return <Flow />
}

export default App
