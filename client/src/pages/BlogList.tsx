import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';
import { BlogPost } from '@/lib/blog';
import { loadAllBlogPosts } from '@/lib/blogLoader';

/**
 * ブログ記事一覧ページ
 */
export default function BlogList() {
  const [, navigate] = useLocation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const loadedPosts = await loadAllBlogPosts();
      // 日付でソート（新しい順）
      loadedPosts.sort((a, b) => b.date.getTime() - a.date.getTime());
      setPosts(loadedPosts);
      setLoading(false);
    };

    loadPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-15% via-purple-50 via-35% to-blue-100 py-8 px-4">
      {/* 背景装飾 */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <filter id="blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>
          </defs>
          <path
            d="M 0 100 Q 300 50 600 100 T 1200 100 L 1200 0 L 0 0 Z"
            fill="rgba(255, 200, 220, 0.10)"
            filter="url(#blur)"
          />
          <path
            d="M 0 250 Q 300 180 600 250 T 1200 250 L 1200 150 L 0 150 Z"
            fill="rgba(200, 190, 255, 0.10)"
            filter="url(#blur)"
          />
          <path
            d="M 0 400 Q 300 320 600 400 T 1200 400 L 1200 300 L 0 300 Z"
            fill="rgba(168, 216, 255, 0.25)"
            filter="url(#blur)"
          />
          <path
            d="M 0 550 Q 300 470 600 550 T 1200 550 L 1200 450 L 0 450 Z"
            fill="rgba(147, 197, 253, 0.30)"
            filter="url(#blur)"
          />
          <path
            d="M 0 700 Q 300 620 600 700 T 1200 700 L 1200 600 L 0 600 Z"
            fill="rgba(135, 206, 250, 0.35)"
            filter="url(#blur)"
          />
          <path
            d="M 0 850 Q 300 770 600 850 T 1200 850 L 1200 750 L 0 750 Z"
            fill="rgba(173, 216, 230, 0.30)"
            filter="url(#blur)"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="mb-6 border-gray-300 hover:bg-blue-100"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            カレンダーに戻る
          </Button>

          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">
              Journal
            </h1>
            <p className="text-lg text-gray-600">すべての記事</p>
          </div>
        </div>

        {/* ローディング状態 */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">記事を読み込み中...</p>
          </div>
        )}

        {/* 記事一覧 */}
        {!loading && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="p-4 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden"
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                <img
                  src="https://placehold.jp/400x250.png"
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-t-lg mb-3 group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.jp/400x250.png';
                  }}
                />
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{post.description}</p>
                  <div className="flex flex-wrap gap-1 pt-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 pt-2">
                    {post.date.toLocaleDateString('ja-JP')}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* 記事がない場合 */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-6">記事がまだありません。</p>
            <Button
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              カレンダーに戻る
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
