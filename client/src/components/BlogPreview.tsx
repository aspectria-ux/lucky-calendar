import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/lib/blog';
import { loadAllBlogPosts } from '@/lib/blogLoader';

/**
 * カレンダー下部に表示するブログ記事プレビュー
 * 最新の記事を3件表示
 */
export default function BlogPreview() {
  const [, navigate] = useLocation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllBlogPosts().then((loadedPosts) => {
      // 最新3件を取得
      setPosts(loadedPosts.slice(0, 3));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="mt-8 bg-white rounded-lg p-6 border-2 border-gray-200 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-800">Journal</h3>
        </div>
        <p className="text-gray-500 text-center py-8">記事を読み込み中...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 bg-white rounded-lg p-6 border-2 border-gray-200 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-800">Journal</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => navigate(`/blog/${post.slug}`)}
          >
            <img
              src="https://placehold.jp/400x250.png"
              alt={post.title}
              className="w-full h-32 object-cover rounded-t-lg mb-2"
              onError={(e) => {
                e.currentTarget.src = 
                  "https://placehold.jp/400x250.png";
              }}
            />
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                {post.title}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-2">{post.description}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {post.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                {post.date.toLocaleDateString('ja-JP')}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* 記事をもっと見るボタン */}
      <div className="mt-6 text-center">
        <Button
          onClick={() => navigate('/blog')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2 mx-auto"
        >
          記事をもっと見る
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
