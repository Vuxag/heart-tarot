import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function Tutorial({ isOpen, onClose }) {
  const { language } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)

  if (!isOpen) return null

  const steps = [
    {
      title: 'Chào mừng đến với Tarot 3D',
      content: 'Khám phá thế giới huyền bí của Tarot qua trải nghiệm 3D độc đáo. Hãy để chúng tôi hướng dẫn bạn qua các bước cơ bản.',
      image: '/images/tutorial/welcome.png'
    },
    {
      title: 'Chọn lá bài',
      content: 'Nhấp vào các lá bài để chọn chúng. Bạn có thể chọn nhiều lá cho một bài đọc, hoặc để hệ thống chọn ngẫu nhiên.',
      image: '/images/tutorial/select-cards.png'
    },
    {
      title: 'Đặt câu hỏi',
      content: 'Tập trung vào câu hỏi hoặc vấn đề bạn muốn tìm hiểu. Câu hỏi càng cụ thể, câu trả lời càng rõ ràng.',
      image: '/images/tutorial/ask-question.png'
    },
    {
      title: 'Diễn giải',
      content: 'Mỗi lá bài đều mang một ý nghĩa riêng. Hãy đọc kỹ phần diễn giải và kết nối nó với câu hỏi của bạn.',
      image: '/images/tutorial/interpretation.png'
    },
    {
      title: 'Lưu trữ',
      content: 'Đăng nhập để lưu lại lịch sử bài đọc của bạn. Bạn có thể xem lại các bài đọc trước đó và theo dõi sự phát triển.',
      image: '/images/tutorial/history.png'
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onClose()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-purple-900/90 to-indigo-900/90 p-6 rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {steps[currentStep].title}
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

        <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
          <img
            src={steps[currentStep].image}
            alt={steps[currentStep].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <p className="text-white text-lg mb-8">
          {steps[currentStep].content}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep ? 'bg-purple-500' : 'bg-white/30'
                }`}
              />
            ))}
          </div>

          <div className="flex space-x-4">
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                className="px-4 py-2 text-white hover:text-purple-300 transition-colors"
              >
                Quay lại
              </button>
            )}
            <button
              onClick={handleNext}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition-colors"
            >
              {currentStep === steps.length - 1 ? 'Bắt đầu' : 'Tiếp theo'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 