import { getAllRetrogradeEvents } from '@/data/calendarData';

/**
 * 逆行を期間の帯で表示するコンポーネント
 * カレンダー下部に月ごとの逆行期間を視覚化
 */
export default function RetrogradeBars({ month, year }: { month: number; year: number }) {
  const allRetrogrades = getAllRetrogradeEvents();
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);

  // 今月に関連する逆行を取得
  const relevantRetrogrades = allRetrogrades.filter((event) => {
    return event.endDate >= monthStart && event.startDate <= monthEnd;
  });

  if (relevantRetrogrades.length === 0) {
    return null;
  }

  // 月の総日数
  const totalDays = monthEnd.getDate();

  // 逆行の色定義
  const getRetrogradColor = (planet: string) => {
    return planet === 'mercury' 
      ? 'bg-gradient-to-r from-blue-300 to-cyan-400' 
      : 'bg-gradient-to-r from-amber-300 to-amber-400';
  };

  const getPlanetLabel = (planet: string) => {
    return planet === 'mercury' ? '水星逆行' : '金星逆行';
  };

  return (
    <div className="mt-6 pt-6 border-t-2 border-gray-200 space-y-4">
      <h4 className="text-sm font-bold text-gray-800">惑星逆行期間</h4>
      
      {relevantRetrogrades.map((event, idx) => {
        // 月内での開始・終了日を計算
        const effectiveStart = event.startDate < monthStart ? monthStart : event.startDate;
        const effectiveEnd = event.endDate > monthEnd ? monthEnd : event.endDate;

        const startDay = effectiveStart.getDate();
        const endDay = effectiveEnd.getDate();
        
        // 月内での位置を計算
        const startPercent = ((startDay - 1) / totalDays) * 100;
        const endPercent = (endDay / totalDays) * 100;
        const widthPercent = endPercent - startPercent;

        const planetLabel = getPlanetLabel(event.planet);
        const colorClass = getRetrogradColor(event.planet);

        return (
          <div key={idx} className="space-y-2">
            {/* ラベル */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-700">{planetLabel}</span>
              <span className="text-xs text-gray-500">
                {effectiveStart.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })} 〜{' '}
                {effectiveEnd.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
              </span>
            </div>

            {/* バー表示 */}
            <div className="w-full h-6 bg-gray-100 rounded-full overflow-hidden border border-gray-300 relative">
              {/* 背景グリッド（週の区切り） */}
              <div className="absolute inset-0 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 border-r border-gray-200 opacity-50"
                    style={{ width: `${100 / 5}%` }}
                  />
                ))}
              </div>

              {/* 逆行期間の帯 */}
              <div
                className={`absolute top-0 bottom-0 ${colorClass} rounded-full flex items-center justify-center text-xs font-bold text-gray-700 transition-all`}
                style={{
                  left: `${startPercent}%`,
                  width: `${widthPercent}%`,
                  minWidth: '40px',
                }}
              >
                {widthPercent > 15 && `${Math.round(endDay - startDay + 1)}日`}
              </div>
            </div>

            {/* 日付ルーラー */}
            <div className="flex text-[10px] text-gray-400 px-1">
              <div className="flex-1 text-left">1</div>
              <div className="flex-1 text-center">{Math.round(totalDays / 2)}</div>
              <div className="flex-1 text-right">{totalDays}</div>
            </div>
          </div>
        );
      })}

      {/* 凡例 */}
      <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
        <p className="text-xs font-semibold text-gray-600">凡例</p>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-300 to-cyan-400 rounded" />
            <span className="text-gray-600">水星逆行</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-amber-300 to-amber-400 rounded" />
            <span className="text-gray-600">金星逆行</span>
          </div>
        </div>
      </div>
    </div>
  );
}
