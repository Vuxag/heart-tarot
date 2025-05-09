import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { useAudio } from '../contexts/AudioContext'

export default function Settings({ isOpen, onClose }) {
  const { language, toggleLanguage } = useLanguage()
  const { volume, setSoundVolume, isMuted, toggleMute } = useAudio()
  const [cardSpeed, setCardSpeed] = useState(1)
  const [particleDensity, setParticleDensity] = useState(50)
  const [showTutorial, setShowTutorial] = useState(true)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-purple-900/90 to-indigo-900/90 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            Cài đặt
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-purple-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Language Setting */}
          <div>
            <label className="block text-white mb-2">
              Ngôn ngữ
            </label>
            <button
              onClick={toggleLanguage}
              className="w-full bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-colors"
            >
              {language === 'vi' ? 'English' : 'Tiếng Việt'}
            </button>
          </div>

          {/* Audio Settings */}
          <div>
            <label className="block text-white mb-2">
              Âm thanh
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleMute}
                className="text-white hover:text-purple-300 transition-colors"
              >
                {isMuted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setSoundVolume(parseFloat(e.target.value))}
                className="flex-1 accent-purple-500"
              />
            </div>
          </div>

          {/* Card Animation Speed */}
          <div>
            <label className="block text-white mb-2">
              Tốc độ lá bài
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={cardSpeed}
              onChange={(e) => setCardSpeed(parseFloat(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>

          {/* Particle Effects */}
          <div>
            <label className="block text-white mb-2">
              Mật độ hiệu ứng
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={particleDensity}
              onChange={(e) => setParticleDensity(parseInt(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>

          {/* Tutorial Setting */}
          <div>
            <label className="flex items-center space-x-2 text-white">
              <input
                type="checkbox"
                checked={showTutorial}
                onChange={(e) => setShowTutorial(e.target.checked)}
                className="form-checkbox h-5 w-5 text-purple-500 rounded"
              />
              <span>
                Hiển thị hướng dẫn
              </span>
            </label>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
} 