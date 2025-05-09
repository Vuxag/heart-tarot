import * as THREE from 'three';

const cardNames = {
  en: [
    'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
    'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit',
    'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance',
    'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun',
    'Judgement', 'The World'
  ],
  vi: [
    'Kẻ Khờ Dại', 'Pháp Sư', 'Nữ Tư Tế', 'Hoàng Hậu', 'Hoàng Đế',
    'Giáo Hoàng', 'Tình Yêu', 'Cỗ Xe', 'Sức Mạnh', 'Ẩn Sĩ',
    'Vận May', 'Công Lý', 'Người Treo', 'Cái Chết', 'Điều Độ',
    'Quỷ Dữ', 'Tòa Tháp', 'Ngôi Sao', 'Mặt Trăng', 'Mặt Trời',
    'Phán Xét', 'Thế Giới'
  ]
};

export function createCardImage(cardId) {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');

      // Create background
      const gradient = ctx.createLinearGradient(0, 0, 1024, 1024);
      gradient.addColorStop(0, '#1a1a1a');
      gradient.addColorStop(1, '#4a4a4a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1024, 1024);

      // Draw border
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 20;
      ctx.strokeRect(50, 50, 924, 924);

      // Draw card name (English)
      ctx.font = 'bold 48px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(cardNames.en[cardId], 512, 180);

      // Draw card name (Vietnamese)
      ctx.font = 'bold 36px Arial';
      ctx.fillStyle = '#ffd700';
      ctx.fillText(cardNames.vi[cardId], 512, 240);

      // Draw decorative elements
      ctx.beginPath();
      ctx.arc(512, 512, 300, 0, Math.PI * 2);
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 10;
      ctx.stroke();

      // Draw card number
      ctx.font = 'bold 72px Arial';
      ctx.fillStyle = '#ffd700';
      ctx.fillText((cardId + 1).toString(), 512, 512);

      // Convert to texture
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;

      // Save image
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.download = `${cardId}.jpg`;
      link.click();

      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

export function createAllCardImages() {
  return Promise.all(cardNames.en.map((_, index) => createCardImage(index)));
} 