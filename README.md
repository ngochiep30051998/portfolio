# Portfolio Admin Dashboard

## Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd portfolio-client
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file môi trường:
```bash
cp .env.example .env.local
```

4. Cập nhật các biến môi trường trong file `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

5. Chạy ứng dụng:
```bash
npm run dev
```

## Cấu trúc thư mục

```
/
├── app/                    # Next.js app directory
│   └── admin/             # Admin dashboard pages
├── lib/                   # Shared libraries
├── public/               # Static files
└── services/             # API services
```

## Bảo mật

- Không commit file `.env.local` lên repository
- Sử dụng biến môi trường cho các thông tin nhạy cảm
- Đảm bảo các key Supabase được bảo vệ

## Công nghệ sử dụng

- Next.js 13
- TypeScript
- Tailwind CSS
- Supabase
- React Hot Toast

## What you will learn
- Latest Next.js 13 features
- Next.js App Router
- Next.js Server Actions
- Client & Server Components
- TypeScript (Beginner & Intermediate)
- Tailwind CSS
- Context API
- Advanced Animations with Framer Motion
- React.Email & Resend
- Custom React hooks
- Fresh, modern UI design
- Light & Dark mode
- Responsive website




