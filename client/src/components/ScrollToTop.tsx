import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * ページ遷移時にスクロール位置をトップに戻すコンポーネント
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // ページ遷移時にスクロール位置をトップに戻す
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}
