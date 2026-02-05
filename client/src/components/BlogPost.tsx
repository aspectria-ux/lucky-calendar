import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { BlogPost as BlogPostType } from '@/lib/blog';
import { getBlogPostBySlug } from '@/lib/blogLoader';
import { Streamdown } from 'streamdown';

interface BlogPostProps {
  slug: string;
  onBack: () => void;
}

/**
 * ブログ詳細ページコンポーネント
 */
export default function BlogPost({ slug, onBack }: BlogPostProps) {
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPostBySlug(slug).then((loadedPost) => {
      setPost(loadedPost);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">記事を読み込み中...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">記事が見つかりません</p>
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          戻る
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 戻るボタン */}
      <Button onClick={onBack} variant="outline" className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        ブログ一覧に戻る
      </Button>

      {/* 記事コンテナ */}
      <Card className="p-8 border-2 border-gray-200">
        {/* タイトル */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>

        {/* メタ情報 */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6 pb-6 border-b-2 border-gray-200">
          <span>{post.date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span>著者: {post.author}</span>
        </div>

        {/* タグ */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* 本文 */}
        <div className="prose prose-lg max-w-none text-gray-700">
          <Streamdown>{post.content}</Streamdown>
        </div>
      </Card>
    </div>
  );
}
