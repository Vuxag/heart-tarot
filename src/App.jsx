import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { AudioProvider } from './contexts/AudioContext'
import { LanguageProvider } from './contexts/LanguageContext'
import Login from './pages/Login'
import TarotReading from './pages/TarotReading'
import History from './pages/History'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <AudioProvider>
            <div className="min-h-screen">
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
            </div>
          </AudioProvider>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  )
}

export default App 