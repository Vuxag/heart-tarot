import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const { signInWithGoogle, signInAsGuest } = useAuth()
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      navigate('/')
    } catch (error) {
      console.error('Lỗi đăng nhập bằng Google:', error)
    }
  }

  const handleGuestSignIn = async () => {
    try {
      await signInAsGuest()
      navigate('/')
    } catch (error) {
      console.error('Lỗi đăng nhập với tư cách khách:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white/10 p-8 rounded-lg backdrop-blur-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Bài Tarot 3D</h1>
        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-white text-gray-800 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors"
          >
            <img src="/google-icon.svg" alt="Google" className="w-6 h-6" />
            <span>Tiếp tục với Google</span>
          </button>
          <button
            onClick={handleGuestSignIn}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Tiếp tục với tư cách khách
          </button>
        </div>
      </div>
    </div>
  )
} 