import { useAudio } from '../contexts/AudioContext';

export default function SelectedCards({ selectedCards, onReset }) {
  const { playSound } = useAudio();

  const handleReset = () => {
    playSound('cardFlip');
    onReset();
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold gradient-text">Bài đã chọn</h2>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Chọn lại
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {selectedCards.map((card, index) => (
          <div key={card.id} className="glass p-4 rounded-lg card-hover">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">
                {card.name}
                {card.isReversed && (
                  <span className="text-sm text-red-400 ml-2">(Ngược)</span>
                )}
              </h3>
              <span className="text-lg font-bold text-purple-400">#{index + 1}</span>
            </div>
            <p className="text-gray-300">{card.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 