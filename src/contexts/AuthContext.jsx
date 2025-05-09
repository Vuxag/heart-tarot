import { createContext, useContext, useState, useEffect } from 'react'
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInAnonymously,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '../config/firebase'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error('Error signing in with Google:', error)
      throw error
    }
  }

  const signInAsGuest = async () => {
    try {
      await signInAnonymously(auth)
    } catch (error) {
      console.error('Error signing in as guest:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  const value = {
    currentUser,
    signInWithGoogle,
    signInAsGuest,
    logout
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 