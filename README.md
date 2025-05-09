# Tarot 3D Reading

Ứng dụng đọc bài Tarot 3D với giao diện đẹp mắt và trải nghiệm tương tác.

## Tính năng

- Giao diện 3D cho lá bài Tarot
- Hiệu ứng particle và animation mượt mà
- Hỗ trợ đa ngôn ngữ (Tiếng Việt/English)
- Hệ thống âm thanh tương tác
- Lưu trữ lịch sử bài đọc
- Hướng dẫn sử dụng
- Tùy chỉnh cài đặt

## Công nghệ sử dụng

- React
- Three.js
- Tailwind CSS
- Firebase
- Vite

## Cài đặt

1. Clone repository:
```bash
git clone https://github.com/your-username/tarot-3d.git
cd tarot-3d
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file .env và cấu hình Firebase:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Chạy ứng dụng:
```bash
npm run dev
```

## Cấu trúc dự án

```
src/
  ├── components/     # React components
  ├── contexts/       # React contexts
  ├── hooks/         # Custom hooks
  ├── models/        # 3D models
  ├── assets/        # Static assets
  └── utils/         # Utility functions
```

## Đóng góp

Mọi đóng góp đều được hoan nghênh! Vui lòng tạo issue hoặc pull request để đóng góp.

## Giấy phép

MIT License 