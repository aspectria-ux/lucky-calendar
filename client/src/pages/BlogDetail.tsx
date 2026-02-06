import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/lib/blog';
import { getBlogPostBySlug } from '@/lib/blogLoader';

/**
 * ブログ記事詳細ページ
 */
export default function BlogDetail() {
  const params = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (params.slug) {
        const loadedPost = await getBlogPostBySlug(params.slug);
        setPost(loadedPost);
      }
      setLoading(false);
    };

    loadPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-15% via-purple-50 via-35% to-blue-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-gray-500">記事を読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-15% via-purple-50 via-35% to-blue-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            戻る
          </Button>
          <Card className="p-6 text-center">
            <p className="text-gray-600">記事が見つかりません。</p>
          </Card>
        </div>
      </div>
    );
  }

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

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* 戻るボタン */}
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="mb-6 border-gray-300 hover:bg-blue-100"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          カレンダーに戻る
        </Button>

        {/* 記事カード */}
        <Card className="p-6 sm:p-8 shadow-lg border-2 border-gray-200">
          {/* アイキャッチ画像 */}
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.jp/400x250.png';
              }}
            />
          )}

          {/* タイトル */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            {post.title}
          </h1>

          {/* メタ情報 */}
          <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200">
            <span className="text-sm text-gray-500">
              {post.date.toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* 本文 */}
          <div className="prose prose-sm sm:prose max-w-none text-gray-700 leading-relaxed">
            {post.content.split('\n').map((paragraph, index) => {
              if (!paragraph.trim()) return null;
              if (paragraph.startsWith('###')) {
                return (
                  <h3 key={index} className="text-xl font-bold text-gray-800 mt-6 mb-3">
                    {paragraph.replace(/^#+\s*/, '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('##')) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                    {paragraph.replace(/^#+\s*/, '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('-')) {
                return (
                  <li key={index} className="ml-6 mb-2">
                    {paragraph.replace(/^-\s*/, '')}
                  </li>
                );
              }
              return (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* フッター */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="border-gray-300 hover:bg-blue-100"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              カレンダーに戻る
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
