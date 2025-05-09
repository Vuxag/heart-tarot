import { useAudio } from '../contexts/AudioContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function ControlBar({ onRandomSelect }) {
  const { isMuted, volume, toggleMute, setSoundVolume } = useAudio();
  const { language, toggleLanguage } = useLanguage();
  const { currentUser } = useAuth();

  return (
    <div className="fixed top-4 right-4 flex items-center space-x-4 glass p-2 rounded-full">
      <button
        onClick={onRandomSelect}
        className="p-2 rounded-full hover:bg-white/10 transition-colors"
        title="Chọn ngẫu nhiên"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>

      <button
        onClick={toggleLanguage}
        className="p-2 rounded-full hover:bg-white/10 transition-colors"
        title={language === 'vi' ? 'Switch to English' : 'Chuyển sang tiếng Việt'}
      >
        {language === 'vi' ? 'EN' : 'VI'}
      </button>

      <button
        onClick={toggleMute}
        className="p-2 rounded-full hover:bg-white/10 transition-colors"
        title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
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
        className="w-24 accent-purple-500"
      />

      {currentUser && (
        <Link
          to="/history"
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          title="Lịch sử bài đọc"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </Link>
      )}
    </div>
  );
} 