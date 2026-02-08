/**
 * 広告バナースペースコンポーネント
 */
export default function AdBanner() {
  return (
    <div className="mt-12 mb-12">
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-dashed border-gray-400 rounded-lg p-8 text-center">
        <div className="w-full h-48 flex items-center justify-center bg-gray-300 rounded">
          <div className="text-gray-600 text-lg font-semibold">
            広告スペース
            <br />
            <span className="text-sm">728 x 90 / 300 x 250</span>
          </div>
        </div>
      </div>
    </div>
  );
}
