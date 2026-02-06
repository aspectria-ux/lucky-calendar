import { getRokuyo, getLuckyDays, getCelestialEventsForDate } from '@/data/calendarData';
import { luckyDayMeanings, celestialEventMeanings, rokuyoMeanings } from '@/data/meanings';

interface CalendarDayProps {
  day: Date | null;
  isSelected: boolean;
  onSelect: (date: Date | null) => void;
}

/**
 * カレンダーの1日を表すコンポーネント
 * デザイン: クラウドドリーム - 細い黒枠 + パステルグラデーション内部
 * 日本語化: 六曜を漢字表記、吉日をドット＋文字で表示
 */
export default function CalendarDay({ day, isSelected, onSelect }: CalendarDayProps) {
  if (!day) {
    return <div className="aspect-square" />;
  }

  const rokuyo = getRokuyo(day);
  const luckyDays = getLuckyDays(day);
  const celestialEvents = getCelestialEventsForDate(day);

  // 六曜の漢字表記を取得
  const rokuyoName = rokuyoMeanings[rokuyo]?.name || rokuyo;

  // 吉日の色を決定（複数ある場合は最初のものを使用）
  let gradientColor = 'from-gray-100 to-gray-50';
  if (luckyDays.length > 0) {
    const firstLuckyDay = luckyDays[0];
    gradientColor = luckyDayMeanings[firstLuckyDay]?.color || 'from-gray-100 to-gray-50';
  }

  // 不成就日の場合は色を変更
  if (luckyDays.includes('fushojuju')) {
    gradientColor = 'from-gray-300 to-gray-200';
  }

  const hasSpecialDay = luckyDays.length > 0 || celestialEvents.length > 0;

  // 吉日の省略名を取得（最大2つまで表示）
  const luckyDayLabels = luckyDays
    .filter(ld => ld !== 'fushojuju') // 不成就日は別表示
    .slice(0, 2)
    .map(ld => luckyDayMeanings[ld]?.shortName || '');

  const hasFushojuju = luckyDays.includes('fushojuju');

  return (
    <button
      onClick={() => onSelect(day)}
      className={`
        aspect-square p-1 sm:p-2 rounded-lg border-2 transition-all duration-300
        ${isSelected ? 'border-gray-800 shadow-lg scale-105' : 'border-gray-300 hover:border-gray-500'}
        ${hasSpecialDay ? `bg-gradient-to-br ${gradientColor}` : 'bg-white hover:bg-gray-50'}
        hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
      `}
    >
      <div className="flex flex-col h-full justify-between text-xs">
        {/* 日付 */}
        <div className="font-bold text-gray-800 text-sm sm:text-base">{day.getDate()}</div>

        {/* 六曜（漢字表記） */}
        <div className="text-gray-600 font-medium text-[10px] sm:text-xs">{rokuyoName}</div>

        {/* 吉日表示エリア */}
        <div className="flex flex-col gap-0.5">
          {/* 吉日ラベル（文字表示） */}
          {luckyDayLabels.length > 0 && (
            <div className="flex flex-wrap gap-0.5 justify-center">
              {luckyDayLabels.map((label, idx) => (
                <span
                  key={idx}
                  className="text-[8px] sm:text-[10px] font-bold text-gray-700 bg-white/60 px-0.5 rounded"
                >
                  {label}
                </span>
              ))}
            </div>
          )}

          {/* 不成就日の場合は赤で表示 */}
          {hasFushojuju && (
            <span className="text-[8px] sm:text-[10px] font-bold text-red-600 bg-white/60 px-0.5 rounded text-center">
              不成
            </span>
          )}

          {/* 天体イベント（アイコン表示） */}
          {celestialEvents.length > 0 && (
            <div className="flex justify-center gap-0.5">
              {celestialEvents.map((event) => (
                <span
                  key={event}
                  className="text-[10px] sm:text-xs"
                  title={celestialEventMeanings[event]?.name}
                >
                  {celestialEventMeanings[event]?.emoji}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
