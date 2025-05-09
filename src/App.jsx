import { Routes, Route } from 'react-router-dom'
import TarotReading from './pages/TarotReading'
import History from './pages/History'
import Login from './pages/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<TarotReading />} />
      <Route path="/history" element={<History />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App 