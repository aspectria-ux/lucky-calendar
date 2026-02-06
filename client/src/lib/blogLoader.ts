/**
 * ブログ記事をローダーから読み込むユーティリティ
 * Viteのglob importを使用して、src/content/blog内のMarkdownファイルを動的に読み込む
 */

import { createBlogPost, BlogPost } from './blog';

// Viteのglob importで全ブログ記事を読み込む
const blogModules = import.meta.glob<string>(
  '../content/blog/*.md',
  { query: '?raw', import: 'default' }
);

let cachedPosts: BlogPost[] | null = null;

/**
 * すべてのブログ記事を読み込む
 */
export async function loadAllBlogPosts(): Promise<BlogPost[]> {
  if (cachedPosts) {
    return cachedPosts;
  }

  const posts: BlogPost[] = [];

  for (const [path, loader] of Object.entries(blogModules)) {
    try {
      const content = await loader() as string;
      const id = path.split('/').pop()?.replace('.md', '') || '';
      const post = createBlogPost(id, content);
      posts.push(post);
    } catch (error) {
      console.error(`Failed to load blog post from ${path}:`, error);
    }
  }

  // 日付でソート（新しい順）
  posts.sort((a, b) => b.date.getTime() - a.date.getTime());

  cachedPosts = posts;
  return posts;
}

/**
 * 特定のスラグのブログ記事を取得
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await loadAllBlogPosts();
  return posts.find((post) => post.slug === slug) || null;
}

/**
 * タグでブログ記事をフィルタリング
 */
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await loadAllBlogPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

/**
 * すべてのタグを取得
 */
export async function getAllBlogTags(): Promise<string[]> {
  const posts = await loadAllBlogPosts();
  const tags = new Set<string>();

  for (const post of posts) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }

  return Array.from(tags).sort();
}
