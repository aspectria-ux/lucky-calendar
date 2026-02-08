import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/lib/blog';
import { loadAllBlogPosts } from '@/lib/blogLoader';

/**
 * 最新ブログ記事を3件表示するコンポーネント
 */
export default function LatestBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [, navigate] = useLocation();

  useEffect(() => {
    loadAllBlogPosts().then((loadedPosts) => {
      // 日付でソート（新しい順）して最新3件を取得
      const sortedPosts = loadedPosts
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 3);
      setPosts(sortedPosts);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">記事を読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">最新の Journal</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="p-6 border-2 border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/blog/${post.slug}`)}
          >
            <div className="space-y-3">
              {/* タイトル */}
              <h4 className="text-lg font-bold text-gray-800 line-clamp-2">{post.title}</h4>

              {/* 日付 */}
              <p className="text-sm text-gray-500">
                {post.date.toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>

              {/* 抜粋 */}
              <p className="text-sm text-gray-700 line-clamp-3">{post.description}</p>

              {/* 続きを読むリンク */}
              <div className="pt-2">
                <span className="text-sm font-semibold text-pink-600 hover:text-pink-700">
                  続きを読む →
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 記事をもっと見るボタン */}
      <div className="text-center">
        <Button
          onClick={() => navigate('/blog')}
          className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white"
        >
          記事をもっと見る
        </Button>
      </div>
    </div>
  );
}
