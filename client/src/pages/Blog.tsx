import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import BlogList from '@/components/BlogList';
import BlogPostDetail from '@/components/BlogPostDetail';

/**
 * ブログページ: ブログ一覧と詳細を管理
 * ルート: /blog (一覧), /blog/:slug (詳細)
 */
export default function Blog() {
  const [location, navigate] = useLocation();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  // URLから現在のスラグを抽出
  useEffect(() => {
    const match = location.match(/^\/blog\/(.+)$/);
    if (match) {
      setSelectedSlug(match[1]);
    } else {
      setSelectedSlug(null);
    }
  }, [location]);

  const handleSelectPost = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  const handleBackToList = () => {
    navigate('/blog');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8 px-4">
      {/* 背景装飾: 雲のような半透明パターン */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <filter id="blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>
          </defs>
          <path
            d="M 0 200 Q 300 100 600 200 T 1200 200 L 1200 0 L 0 0 Z"
            fill="rgba(255, 182, 217, 0.2)"
            filter="url(#blur)"
          />
          <path
            d="M 0 400 Q 300 300 600 400 T 1200 400 L 1200 300 L 0 300 Z"
            fill="rgba(212, 181, 255, 0.15)"
            filter="url(#blur)"
          />
          <path
            d="M 0 600 Q 300 500 600 600 T 1200 600 L 1200 500 L 0 500 Z"
            fill="rgba(168, 216, 255, 0.2)"
            filter="url(#blur)"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* ヘッダー */}
        {!selectedSlug && (
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-800 mb-2">
              Journal
            </h1>
            <p className="text-lg text-gray-600">流れに流らされず、流れにのって軽やかに進む</p>
          </div>
        )}

        {/* コンテンツ */}
        {selectedSlug ? (
          <BlogPostDetail slug={selectedSlug} onBack={handleBackToList} />
        ) : (
          <BlogList onSelectPost={handleSelectPost} />
        )}
      </div>
    </div>
  );
}
