import { Routes, Route, Navigate } from 'react-router-dom'
import TarotReading from './pages/TarotReading'
import History from './pages/History'
import Login from './pages/Login'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <Routes>
        <Route path="/" element={<TarotReading />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App 