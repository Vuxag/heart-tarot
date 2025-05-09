import * as THREE from 'three';

export function createCardBack() {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 1024, 1024);
      gradient.addColorStop(0, '#2c3e50');
      gradient.addColorStop(1, '#3498db');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1024, 1024);

      // Draw decorative elements
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 20;
      ctx.beginPath();
      ctx.arc(512, 512, 400, 0, Math.PI * 2);
      ctx.stroke();

      // Draw inner circle
      ctx.beginPath();
      ctx.arc(512, 512, 300, 0, Math.PI * 2);
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 10;
      ctx.stroke();

      // Draw tarot symbols
      const symbols = ['☀', '☽', '⚡', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
      ctx.font = '48px Arial';
      ctx.fillStyle = '#ffffff';
      symbols.forEach((symbol, i) => {
        const angle = (i / symbols.length) * Math.PI * 2;
        const x = 512 + Math.cos(angle) * 300;
        const y = 512 + Math.sin(angle) * 300;
        ctx.fillText(symbol, x - 24, y + 24);
      });

      // Draw title
      ctx.font = 'bold 72px Arial';
      ctx.fillStyle = '#ffd700';
      ctx.textAlign = 'center';
      ctx.fillText('TAROT', 512, 512);

      // Add texture
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;

      // Save image
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.download = 'card-back.jpg';
      link.click();

      resolve(texture);
    } catch (err) {
      reject(err);
    }
  });
} 