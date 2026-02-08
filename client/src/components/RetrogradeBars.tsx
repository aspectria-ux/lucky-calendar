import { getAllRetrogradeEvents } from '@/data/calendarData';
import { retrogradeEventMeanings } from '@/data/meanings';

interface RetrogradeBar {
  name: string;
  color: string;
  startDate: Date;
  endDate: Date;
}

/**
 * 逆行を期間の帯で表示するコンポーネント
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

  return (
    <div className="mt-6 space-y-3">
      <h4 className="text-sm font-semibold text-gray-700">惑星逆行期間</h4>
      {relevantRetrogrades.map((event, idx) => {
        const planetLabel = event.planet === 'mercury' ? '水星逆行' : '金星逆行';
        const eventMeaning = retrogradeEventMeanings[planetLabel as keyof typeof retrogradeEventMeanings];
        const color = eventMeaning?.color || 'bg-gray-300';

        // 月内での開始・終了日を計算
        const effectiveStart = event.startDate < monthStart ? monthStart : event.startDate;
        const effectiveEnd = event.endDate > monthEnd ? monthEnd : event.endDate;

        const totalDays = Math.floor((monthEnd.getTime() - monthStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        const startOffset = Math.floor((effectiveStart.getTime() - monthStart.getTime()) / (1000 * 60 * 60 * 24));
        const duration = Math.floor((effectiveEnd.getTime() - effectiveStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;

        const startPercent = (startOffset / totalDays) * 100;
        const widthPercent = (duration / totalDays) * 100;

        return (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-700">{event.planet === 'mercury' ? '水星逆行' : '金星逆行'}</span>
              <span className="text-xs text-gray-500">
                {effectiveStart.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })} 〜{' '}
                {effectiveEnd.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
              </span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${color} rounded-full`}
                style={{
                  marginLeft: `${startPercent}%`,
                  width: `${widthPercent}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
