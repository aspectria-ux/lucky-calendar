import { getRokuyo, getLuckyDays, getCelestialEventsForDate } from '@/data/calendarData';
import { luckyDayMeanings, celestialEventMeanings } from '@/data/meanings';

interface CalendarDayProps {
  day: Date | null;
  isSelected: boolean;
  onSelect: (date: Date | null) => void;
}

/**
 * カレンダーの1日を表すコンポーネント
 * デザイン: クラウドドリーム - 細い黒枠 + パステルグラデーション内部
 */
export default function CalendarDay({ day, isSelected, onSelect }: CalendarDayProps) {
  if (!day) {
    return <div className="aspect-square" />;
  }

  const rokuyo = getRokuyo(day);
  const luckyDays = getLuckyDays(day);
  const celestialEvents = getCelestialEventsForDate(day);

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

  return (
    <button
      onClick={() => onSelect(day)}
      className={`
        aspect-square p-2 rounded-lg border-2 transition-all duration-300
        ${isSelected ? 'border-gray-800 shadow-lg scale-105' : 'border-gray-300 hover:border-gray-500'}
        ${hasSpecialDay ? `bg-gradient-to-br ${gradientColor}` : 'bg-white hover:bg-gray-50'}
        hover:shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2
      `}
    >
      <div className="flex flex-col h-full justify-between text-xs">
        {/* 日付 */}
        <div className="font-bold text-gray-800">{day.getDate()}</div>

        {/* 六曜 */}
        <div className="text-gray-600 font-medium">{rokuyo}</div>

        {/* 吉日アイコン */}
        <div className="flex flex-wrap gap-0.5">
          {luckyDays.slice(0, 2).map((luckyDay) => (
            <div
              key={luckyDay}
              className="w-1.5 h-1.5 rounded-full bg-gray-800"
              title={luckyDayMeanings[luckyDay]?.name}
            />
          ))}
          {celestialEvents.map((event) => (
            <div
              key={event}
              className="w-1.5 h-1.5 rounded-full bg-blue-600"
              title={celestialEventMeanings[event]?.name}
            />
          ))}
        </div>
      </div>
    </button>
  );
}
