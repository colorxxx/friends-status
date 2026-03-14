import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '근황 톡 | Friends Status',
  description: '친구들의 근황을 한눈에 확인하세요',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen antialiased">
        <nav className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              근황 톡 💬
            </a>
            <div className="flex gap-4 text-sm">
              <a href="/" className="text-gray-400 hover:text-white transition">홈</a>
              <a href="/add" className="text-gray-400 hover:text-white transition">등록</a>
              <a href="/admin" className="text-gray-400 hover:text-white transition">관리</a>
            </div>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
