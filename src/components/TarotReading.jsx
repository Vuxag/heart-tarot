import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { useAudio } from '../contexts/AudioContext'
import TarotCard3D from './TarotCard3D'
import ControlBar from './ControlBar'
import LoadingScreen from './LoadingScreen'
import Tutorial from './Tutorial'
import Settings from './Settings'
import { tarotCards } from '../data/tarotCards'
import { minorArcana } from '../data/minorArcana'

const TarotReading = () => {
  const { language } = useLanguage()
  const { playSound, isMuted } = useAudio()
  const [isLoading, setIsLoading] = useState(true)
  const [showTutorial, setShowTutorial] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [selectedCards, setSelectedCards] = useState([])
  const [userQuestion, setUserQuestion] = useState('')
  const [isReadingComplete, setIsReadingComplete] = useState(false)
  const [allCards, setAllCards] = useState([])

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    // Combine Major and Minor Arcana cards
    const combinedCards = [
      ...tarotCards,
      ...Object.values(minorArcana).flat()
    ]
    setAllCards(combinedCards)

    return () => clearTimeout(timer)
  }, [])

  const handleCardSelect = (card) => {
    if (selectedCards.length < 3 && !selectedCards.find(c => c.id === card.id)) {
      setSelectedCards([...selectedCards, card])
      playSound('cardSelect')
    }
  }

  const handleRandomSelect = () => {
    if (selectedCards.length < 3) {
      const availableCards = allCards.filter(
        card => !selectedCards.find(c => c.id === card.id)
      )
      const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)]
      setSelectedCards([...selectedCards, randomCard])
      playSound('cardSelect')
    }
  }

  const handleStartReading = () => {
    if (selectedCards.length === 3 && userQuestion.trim()) {
      setIsReadingComplete(true)
      playSound('readingComplete')
    }
  }

  const handleReset = () => {
    setSelectedCards([])
    setUserQuestion('')
    setIsReadingComplete(false)
    playSound('reset')
  }

  const handleSettingsClick = () => {
    setShowSettings(true)
  }

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      <ControlBar
        onRandomSelect={handleRandomSelect}
        onSettingsClick={handleSettingsClick}
        isMuted={isMuted}
      />

      {showTutorial && (
        <Tutorial
          isOpen={showTutorial}
          onClose={() => setShowTutorial(false)}
        />
      )}

      {showSettings && (
        <Settings
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            {language === 'vi' ? 'Bài Đọc Tarot' : 'Tarot Reading'}
          </h1>
          <p className="text-lg opacity-80">
            {language === 'vi'
              ? 'Chọn 3 lá bài và đặt câu hỏi của bạn'
              : 'Select 3 cards and ask your question'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="relative aspect-[2/3] bg-black/20 rounded-lg overflow-hidden"
            >
              {selectedCards[index] ? (
                <TarotCard3D
                  card={selectedCards[index]}
                  isRevealed={isReadingComplete}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-xl opacity-60">
                    {language === 'vi' ? 'Chọn lá bài' : 'Select a card'}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {!isReadingComplete && (
          <div className="mt-8 text-center">
            <textarea
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              placeholder={language === 'vi' ? 'Đặt câu hỏi của bạn...' : 'Ask your question...'}
              className="w-full max-w-lg p-4 bg-black/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={3}
            />
            <button
              onClick={handleStartReading}
              disabled={selectedCards.length !== 3 || !userQuestion.trim()}
              className="mt-4 px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {language === 'vi' ? 'Bắt đầu đọc bài' : 'Start Reading'}
            </button>
          </div>
        )}

        {isReadingComplete && (
          <div className="mt-8 text-center">
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
            >
              {language === 'vi' ? 'Đọc bài mới' : 'New Reading'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TarotReading 