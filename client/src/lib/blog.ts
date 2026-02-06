/**
 * ブログ機能のユーティリティ
 * Markdownファイルを解析し、記事データを取得
 */

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: Date;
  author: string;
  tags: string[];
  content: string;
  slug: string;
  image?: string; // 画像URLを追加
}

export interface BlogMetadata {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string; // 画像URLを追加
}

/**
 * Markdownファイルのフロントマターを解析
 * フォーマット:
 * ---
 * title: 記事タイトル
 * description: 説明
 * date: 2026-02-05
 * author: 著者名
 * tags: [tag1, tag2]
 * ---
 * 本文
 */
export function parseFrontmatter(content: string): {
  metadata: BlogMetadata;
  body: string;
} {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    throw new Error('Invalid frontmatter format');
  }

  const [, frontmatterStr, body] = match;
  const metadata = parseFrontmatterContent(frontmatterStr);

  return { metadata, body };
}

function parseFrontmatterContent(content: string): BlogMetadata {
  const metadata: Partial<BlogMetadata> = {};

  const lines = content.split('\n');
  for (const line of lines) {
    if (!line.trim()) continue;

    const [key, ...valueParts] = line.split(':');
    const value = valueParts.join(':').trim();

    switch (key.trim()) {
      case 'title':
        metadata.title = value;
        break;
      case 'description':
        metadata.description = value;
        break;
      case 'date':
        metadata.date = value;
        break;
      case 'author':
        metadata.author = value;
        break;
case 'tags':
        // タグの解析: [tag1, tag2] または tag1, tag2
        const tagsStr = value.replace(/^[|]$/g, '');
        metadata.tags = tagsStr.split(',').map((tag) => tag.trim());
        break;
      case 'image':
        metadata.image = value;
        break;
    }
  }

  return {
    title: metadata.title || 'Untitled',
    description: metadata.description || '',
    date: metadata.date || new Date().toISOString().split('T')[0],
    author: metadata.author || 'Anonymous',
    tags: metadata.tags || [],
    image: metadata.image || '/placeholder-image.png', // デフォルトのプレースホルダー画像を設定
  };
}

/**
 * スラグを生成（タイトルから）
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * ブログ記事を作成
 */
export function createBlogPost(
  id: string,
  content: string,
): BlogPost {
  const { metadata, body } = parseFrontmatter(content);
  const slug = generateSlug(metadata.title);

  return {
    id,
    title: metadata.title,
    description: metadata.description,
    date: new Date(metadata.date),
    author: metadata.author,
    tags: metadata.tags,
    content: body,
    slug,
    image: metadata.image,
  };
}

/**
 * タグから関連する吉日を取得
 * タグ形式: lucky-ichiryu-manbai, celestial-full-moon など
 */
export function extractLuckyDayTagsFromBlog(tags: string[]): string[] {
  return tags
    .filter((tag) => tag.startsWith('lucky-'))
    .map((tag) => tag.replace('lucky-', ''));
}

export function extractCelestialTagsFromBlog(tags: string[]): string[] {
  return tags
    .filter((tag) => tag.startsWith('celestial-'))
    .map((tag) => tag.replace('celestial-', ''));
}
