import { useState, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Stars } from '@react-three/drei'
import { useAuth } from '../contexts/AuthContext'
import { useAudio } from '../contexts/AudioContext'
import { useLanguage } from '../contexts/LanguageContext'
import { tarotCards } from '../data/tarotCards'
import TarotCard3D from '../components/TarotCard3D'
import SelectedCards from '../components/SelectedCards'
import ControlBar from '../components/ControlBar'
import LoadingScreen from '../components/LoadingScreen'
import Tutorial from '../components/Tutorial'
import Settings from '../components/Settings'

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}

export default function TarotReading() {
  const [selectedCards, setSelectedCards] = useState([])
  const [question, setQuestion] = useState('')
  const [isRevealing, setIsRevealing] = useState(false)
  const [showTutorial, setShowTutorial] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const { currentUser } = useAuth()
  const { playSound, stopSound } = useAudio()
  const { language } = useLanguage()
  const controlsRef = useRef()

  const handleCardClick = (index) => {
    if (selectedCards.length >= 3 || isRevealing) return

    const card = tarotCards[index]
    const isReversed = Math.random() > 0.5

    const newCard = {
      id: index,
      name: language === 'vi' ? card.vietnameseName : card.englishName,
      meaning: isReversed ? card.reversedMeaning : card.meaning,
      isReversed,
      position: selectedCards.length
    }

    setSelectedCards([...selectedCards, newCard])
    playSound('cardFlip')

    if (selectedCards.length === 2) {
      playSound('success')
    }
  }

  const handleRandomSelect = () => {
    if (selectedCards.length >= 3 || isRevealing) return

    const availableCards = tarotCards.filter(
      card => !selectedCards.some(selected => selected.id === card.id)
    )

    const randomIndex = Math.floor(Math.random() * availableCards.length)
    handleCardClick(availableCards[randomIndex].id)
  }

  const saveReading = async () => {
    if (selectedCards.length !== 3) return
    // Mock successful save
    playSound('success')
  }

  const resetReading = () => {
    setSelectedCards([])
    setQuestion('')
    playSound('cardFlip')
  }

  return (
    <div className="min-h-screen p-8">
      {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
      
      <ControlBar 
        onRandomSelect={handleRandomSelect}
        onSettingsClick={() => setShowSettings(true)}
      />
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 gradient-text">
          {language === 'vi' ? 'Bài Tarot 3D' : '3D Tarot Reading'}
        </h1>
        
        <div className="mb-8">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={language === 'vi' ? 'Bạn muốn biết điều gì?' : 'What do you want to know?'}
            className="w-full p-4 rounded-lg glass text-white placeholder-gray-400"
            rows={3}
          />
        </div>

        <div className="h-[70vh] bg-black/20 rounded-lg backdrop-blur-lg overflow-hidden">
          <Canvas
            camera={{ position: [0, 0, 10], fov: 50 }}
            shadows
          >
            <Suspense fallback={<LoadingFallback />}>
              <ambientLight intensity={0.5} />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={1}
                castShadow
              />
              <Stars
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={1}
              />
              <Environment preset="sunset" />
              
              {tarotCards.map((card, index) => (
                <TarotCard3D
                  key={card.id}
                  card={card}
                  position={[
                    (index % 7) * 2 - 6,
                    Math.floor(index / 7) * 3 - 3,
                    0
                  ]}
                  isSelected={selectedCards.some(c => c.id === card.id)}
                  onClick={() => handleCardClick(card.id)}
                />
              ))}

              <OrbitControls
                ref={controlsRef}
                enablePan={false}
                minDistance={5}
                maxDistance={15}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2}
              />
            </Suspense>
          </Canvas>
        </div>

        {selectedCards.length > 0 && (
          <SelectedCards
            selectedCards={selectedCards}
            onReset={resetReading}
          />
        )}

        {selectedCards.length === 3 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={saveReading}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {language === 'vi' ? 'Lưu bài đọc' : 'Save Reading'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 