import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/lib/blog';
import { loadAllBlogPosts } from '@/lib/blogLoader';

/**
 * ブログ記事一覧コンポーネント
 */
export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    loadAllBlogPosts().then((loadedPosts) => {
      setPosts(loadedPosts);
      setLoading(false);
    });
  }, []);

  // タグでフィルタリング
  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts;

  // すべてのタグを取得
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">ブログ記事を読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* タグフィルター */}
      {allTags.length > 0 && (
        <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">タグで絞り込む</h3>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedTag === null ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedTag(null)}
            >
              すべて ({posts.length})
            </Badge>
            {allTags.map((tag) => {
              const count = posts.filter((post) => post.tags.includes(tag)).length;
              return (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag} ({count})
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      {/* ブログ記事一覧 */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">記事がありません</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
           <a href={`/blog/${post.id}`} key={post.id} className="block">
  <Card className="p-6 border-2 border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
    <div className="space-y-3">
      {/* タイトル */}
      <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
      
      {/* メタ情報 */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
        <span>{post.date.toLocaleDateString('ja-JP')}</span>
        <span>著者: {post.author}</span>
      </div>

      {/* 説明 */}
      <p className="text-gray-700">{post.description}</p>

      {/* タグ (クリックしても親のaタグに反応しないようe.stopPropagationを入れると親切です) */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="cursor-pointer hover:bg-gray-300"
              onClick={(e) => {
                e.preventDefault(); // 親のリンクを無効化
                e.stopPropagation(); // 親へのイベント伝播を阻止
                setSelectedTag(tag);
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  </Card>
</a>
          ))}
        </div>
      )}
    </div>
  );
}
