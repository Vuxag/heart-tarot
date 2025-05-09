import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { AudioProvider } from './contexts/AudioContext'
import { LanguageProvider } from './contexts/LanguageContext'
import Login from './pages/Login'
import TarotReading from './pages/TarotReading'
import History from './pages/History'
import ResourceGenerator from './components/ResourceGenerator'
import AudioControls from './components/AudioControls'

function PrivateRoute({ children }) {
  const { currentUser } = useAuth()
  return currentUser ? children : <Navigate to="/login" />
}

function App() {
  const [showResourceGenerator, setShowResourceGenerator] = useState(true)

  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <AudioProvider>
            {showResourceGenerator && (
              <ResourceGenerator onComplete={() => setShowResourceGenerator(false)} />
            )}
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <TarotReading />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/history"
                  element={
                    <PrivateRoute>
                      <History />
                    </PrivateRoute>
                  }
                />
              </Routes>
              <AudioControls />
            </div>
          </AudioProvider>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  )
}

export default App 