import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'

export default function Login() {
  const { signInWithGoogle, signInAsGuest } = useAuth()
  const { language } = useLanguage()
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <div className="glass p-8 rounded-lg max-w-md w-full mx-4">
        <h1 className="text-4xl font-bold text-center mb-8 gradient-text">
          {language === 'vi' ? 'Bài Tarot 3D' : '3D Tarot Reading'}
        </h1>
        
        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-white text-gray-800 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors"
          >
            <img src="/google-icon.svg" alt="Google" className="w-6 h-6" />
            <span className="font-medium">
              {language === 'vi' ? 'Tiếp tục với Google' : 'Continue with Google'}
            </span>
          </button>

          <button
            onClick={handleGuestSignIn}
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <span className="font-medium">
              {language === 'vi' ? 'Tiếp tục với tư cách khách' : 'Continue as Guest'}
            </span>
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-300">
          {language === 'vi' 
            ? 'Đăng nhập để lưu lịch sử bài đọc của bạn'
            : 'Sign in to save your reading history'}
        </p>
      </div>
    </div>
  )
} 