import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import Calendar from '@/components/Calendar';
import LatestBlogPosts from '@/components/LatestBlogPosts';
import AdBanner from '@/components/AdBanner';
import Footer from '@/components/Footer';

/**
 * ホームページ: 開運・吉日＆天体カレンダー2026
 * デザイン: クラウドドリーム - ソフトミニマリズム
 */
export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen">
      {/* ナビゲーションバー */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b-2 border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Celestial Calendar</h1>
          <Button
            onClick={() => navigate('/blog')}
            variant="outline"
            className="border-gray-300 hover:bg-pink-100"
          >
            Journal
          </Button>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <div className="px-4 py-8">
        <Calendar />
        <LatestBlogPosts />
        <AdBanner />
      </div>

      {/* フッター */}
      <Footer />
    </div>
  );
}
