import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { useAudio } from '../contexts/AudioContext'
import TarotCard3D from './TarotCard3D'
import ControlBar from './ControlBar'
import LoadingScreen from './LoadingScreen'
import Tutorial from './Tutorial'
import Settings from './Settings'
import ParticleBackground from './ParticleBackground'

export default function TarotReading() {
  const { language } = useLanguage()
  const { playCardSound } = useAudio()
  const [isLoading, setIsLoading] = useState(true)
  const [showTutorial, setShowTutorial] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [selectedCards, setSelectedCards] = useState([])
  const [question, setQuestion] = useState('')
  const [isReadingComplete, setIsReadingComplete] = useState(false)
  const [isFlipping, setIsFlipping] = useState(false)

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleCardSelect = (card) => {
    if (selectedCards.length < 3 && !selectedCards.find(c => c.id === card.id)) {
      setIsFlipping(true)
      setTimeout(() => {
        setSelectedCards([...selectedCards, card])
        playCardSound()
        setIsFlipping(false)
      }, 500)
    }
  }

  const handleRandomSelect = () => {
    // Implement random card selection logic
  }

  const handleStartReading = () => {
    if (selectedCards.length === 3 && question.trim()) {
      setIsReadingComplete(true)
    }
  }

  const handleReset = () => {
    setSelectedCards([])
    setQuestion('')
    setIsReadingComplete(false)
  }

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <ParticleBackground />
      
      <ControlBar
        onRandomSelect={handleRandomSelect}
        onSettingsClick={() => setShowSettings(true)}
      />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="heading-1 gradient-text mb-4">
            Bài Đọc Tarot
          </h1>
          <p className="body-large text-purple-200">
            Chọn 3 lá bài và đặt câu hỏi của bạn
          </p>
        </div>

        {!isReadingComplete ? (
          <>
            <div className="mb-8">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Nhập câu hỏi của bạn..."
                className="w-full p-4 rounded-lg glass text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((position) => (
                <div
                  key={position}
                  className="aspect-[3/5] glass rounded-lg flex items-center justify-center relative overflow-hidden"
                >
                  {selectedCards[position - 1] ? (
                    <div className={`tarot-card ${isFlipping ? 'card-flip' : ''}`}>
                      <TarotCard3D
                        card={selectedCards[position - 1]}
                        position={position}
                      />
                    </div>
                  ) : (
                    <div className="text-purple-200 text-center body-medium">
                      Chọn lá bài
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleStartReading}
                disabled={selectedCards.length !== 3 || !question.trim()}
                className="button-primary"
              >
                Bắt đầu đọc bài
              </button>
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {selectedCards.map((card, index) => (
                <div key={card.id} className="text-center">
                  <div className="tarot-card">
                    <TarotCard3D card={card} position={index + 1} />
                  </div>
                  <h3 className="card-name mt-4">
                    {card.nameVi}
                  </h3>
                  <p className="body-medium text-purple-200 mt-2">
                    {card.meaningVi}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={handleReset}
                className="button-secondary"
              >
                Đọc bài mới
              </button>
            </div>
          </div>
        )}
      </div>

      <Tutorial
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
      />

      <Settings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  )
} 