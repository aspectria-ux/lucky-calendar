/**
 * ページフッターコンポーネント
 * ページ最下部に表示されるコピーライト情報
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 border-t-2 border-gray-200 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* コピーライト */}
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600">
              © 2026 Aspectria All rights reserved.
            </p>
          </div>

          {/* リンク */}
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              プライバシーポリシー
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              利用規約
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              お問い合わせ
            </a>
          </div>


        </div>

        {/* 下部テキスト */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            このサイトは、開運情報を提供することを目的としています。
            <br />
            医学的根拠はありませんので、参考情報としてご利用ください。
          </p>
        </div>
      </div>
    </footer>
  );
}
