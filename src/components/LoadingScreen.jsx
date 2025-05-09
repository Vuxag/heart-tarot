import { useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function LoadingScreen({ onLoadingComplete }) {
  const { language } = useLanguage()
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('')

  useEffect(() => {
    const loadingTexts = [
      'Đang chuẩn bị lá bài...',
      'Đang kết nối với vũ trụ...',
      'Đang mở cánh cửa tâm linh...',
      'Sẵn sàng cho hành trình...'
    ]

    let currentTextIndex = 0
    const textInterval = setInterval(() => {
      setLoadingText(loadingTexts[currentTextIndex])
      currentTextIndex = (currentTextIndex + 1) % loadingTexts.length
    }, 2000)

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(textInterval)
          setTimeout(onLoadingComplete, 500)
          return 100
        }
        return prev + 1
      })
    }, 50)

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }
  }, [onLoadingComplete])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative w-64 h-64 mb-8">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full animate-spin-slow" />
          
          {/* Middle Ring */}
          <div className="absolute inset-4 border-4 border-indigo-500/40 rounded-full animate-spin-slow-reverse" />
          
          {/* Inner Ring */}
          <div className="absolute inset-8 border-4 border-blue-500/50 rounded-full animate-spin-slow" />
          
          {/* Progress Circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-purple-500/20"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-purple-500"
                  strokeWidth="8"
                  strokeDasharray={`${progress * 2.51} 251.2`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                {progress}%
              </div>
            </div>
          </div>
        </div>

        <div className="text-white text-xl font-medium mb-4">
          {loadingText}
        </div>

        <div className="text-purple-300 text-sm">
          Hãy để tâm trí bạn được thư thái...
        </div>
      </div>
    </div>
  )
} 