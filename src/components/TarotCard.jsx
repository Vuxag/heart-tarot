import { useState } from 'react'

export default function TarotCard({ card, position }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const positions = [
    "Quá khứ",
    "Hiện tại",
    "Tương lai"
  ]

  return (
    <div 
      className="relative w-full aspect-[2/3] cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Mặt trước */}
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-4 flex flex-col items-center justify-center text-white">
          <div className="text-2xl font-bold mb-2">{positions[position]}</div>
          <div className="text-sm text-center opacity-75">Nhấn để xem chi tiết</div>
        </div>

        {/* Mặt sau */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-lg p-4 rotate-y-180">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {card.name}
              {card.isReversed && (
                <span className="text-sm text-red-500 ml-2">(Ngược)</span>
              )}
            </h3>
            <p className="text-gray-600">{card.meaning}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 