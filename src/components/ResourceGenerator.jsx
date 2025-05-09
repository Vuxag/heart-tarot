import { useEffect } from 'react';
import { createCardModel } from '../utils/createCardModel';
import { createCardBack } from '../utils/createCardBack';
import { createAllCardImages } from '../utils/createCardImages';

export default function ResourceGenerator() {
  useEffect(() => {
    // Generate 3D card model
    createCardModel();

    // Generate card back
    const cardBackTexture = createCardBack();
    const cardBackCanvas = cardBackTexture.image;
    const cardBackLink = document.createElement('a');
    cardBackLink.href = cardBackCanvas.toDataURL('image/jpeg');
    cardBackLink.download = 'card-back.jpg';
    cardBackLink.click();

    // Generate card images
    createAllCardImages();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Đang tạo tài nguyên...</h2>
        <p className="text-gray-600">Vui lòng đợi trong giây lát.</p>
      </div>
    </div>
  );
} 