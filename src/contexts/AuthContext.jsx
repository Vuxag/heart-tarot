import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  // Mock user data
  const [currentUser] = useState({
    uid: 'mock-user-id',
    email: 'mock@example.com',
    displayName: 'Mock User'
  })

  const signInWithGoogle = async () => {
    // Mock successful sign in
    return Promise.resolve(currentUser)
  }

  const signInAsGuest = async () => {
    // Mock successful guest sign in
    return Promise.resolve(currentUser)
  }

  const logout = async () => {
    // Mock successful logout
    return Promise.resolve()
  }

  const value = {
    currentUser,
    signInWithGoogle,
    signInAsGuest,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 