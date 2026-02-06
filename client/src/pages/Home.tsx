import Calendar from '@/components/Calendar';
import Footer from '@/components/Footer';

/**
 * ホームページ: 開運・吉日＆天体カレンダー2026
 * デザイン: クラウドドリーム - ソフトミニマリズム
 */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <Calendar />
      </div>
      <Footer />
    </div>
  );
}
