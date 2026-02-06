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
              © {currentYear} Aspectria All rights reserved.
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

          {/* ソーシャルリンク */}
          <div className="flex gap-4">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Twitter"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Instagram"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M16 11.37A4 4 0 1112.63 8A4 4 0 0116 11.37Z" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
              </svg>
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
