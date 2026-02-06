import { RetrogradeEvent } from '@/data/calendarData';
import { retrogradeEventMeanings } from '@/data/meanings';

interface RetrogradeLegendProps {
  retrogrades: RetrogradeEvent[];
}

/**
 * 現在の月に関係する惑星逆行の凡例を表示
 */
export default function RetrogradeLegend({ retrogrades }: RetrogradeLegendProps) {
  if (retrogrades.length === 0) return null;

  return (
    <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
      <p className="text-xs font-semibold text-purple-800 mb-2">この月の惑星逆行期間</p>
      <div className="flex flex-wrap gap-3">
        {retrogrades.map((event, index) => {
          const meaning = retrogradeEventMeanings[event.planet];
          return (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-6 h-2 rounded-full bg-gradient-to-r ${meaning?.color || 'from-purple-400 to-purple-200'}`} />
              <span className="text-xs text-purple-700">
                {meaning?.shortName}: {event.startDate.getMonth() + 1}/{event.startDate.getDate()} 〜 {event.endDate.getMonth() + 1}/{event.endDate.getDate()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
