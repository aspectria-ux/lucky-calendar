import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  getRokuyo,
  getLuckyDays,
  getCelestialEventsForDate,
  getRetrogradeEventsForDate,
} from '@/data/calendarData';
import { luckyDayMeanings, rokuyoMeanings, celestialEventMeanings, retrogradeEventMeanings } from '@/data/meanings';

interface DayDetailProps {
  date: Date;
}

/**
 * 選択された日の詳細情報を表示するコンポーネント
 */
export default function DayDetail({ date }: DayDetailProps) {
  const rokuyo = getRokuyo(date);
  const luckyDays = getLuckyDays(date);
  const celestialEvents = getCelestialEventsForDate(date);
  const retrogradeEvents = getRetrogradeEventsForDate(date);

  const dateStr = date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  const isFushojuju = luckyDays.includes('fushojuju');

  return (
    <Card className="p-6 shadow-lg border-2 border-gray-200 h-full">
      <div className="space-y-4">
        {/* 日付 */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{dateStr}</h3>
        </div>

        {/* 六曜 */}
        <div>
          <h4 className="text-sm font-semibold text-gray-600 mb-2">六曜</h4>
          <Badge
            variant="outline"
            className="bg-gradient-to-r from-blue-100 to-blue-50 border-blue-300 text-gray-800"
          >
            {rokuyoMeanings[rokuyo]?.name}
          </Badge>
          <p className="text-xs text-gray-600 mt-2">{rokuyoMeanings[rokuyo]?.description}</p>
        </div>

        {/* 吉日 */}
        {luckyDays.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-600 mb-2">吉日・凶日</h4>
            <div className="space-y-2">
              {luckyDays.map((luckyDay) => {
                const meaning = luckyDayMeanings[luckyDay];
                const isNegative = luckyDay === 'fushojuju';
                return (
                  <div key={luckyDay} className="p-2 rounded-lg bg-gray-50 border border-gray-200">
                    <p className={`font-semibold text-sm ${isNegative ? 'text-red-600' : 'text-gray-800'}`}>
                      {meaning?.name}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{meaning?.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 天体イベント */}
        {celestialEvents.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-600 mb-2">天体イベント</h4>
            <div className="space-y-2">
              {celestialEvents.map((event) => {
                const meaning = celestialEventMeanings[event];
                return (
                  <div key={event} className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="font-semibold text-sm text-blue-900">
                      {meaning?.emoji} {meaning?.name}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">{meaning?.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 惑星逆行 */}
        {retrogradeEvents.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-600 mb-2">惑星逆行</h4>
            <div className="space-y-2">
              {retrogradeEvents.map((planet) => {
                const meaning = retrogradeEventMeanings[planet];
                return (
                  <div key={planet} className="p-2 rounded-lg bg-purple-50 border border-purple-200">
                    <p className="font-semibold text-sm text-purple-900">{meaning?.name}</p>
                    <p className="text-xs text-purple-700 mt-1">{meaning?.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 何もない場合 */}
        {luckyDays.length === 0 && celestialEvents.length === 0 && retrogradeEvents.length === 0 && (
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 text-center">
            <p className="text-sm text-gray-600">この日に特別な吉日や天体イベントはありません</p>
          </div>
        )}
      </div>
    </Card>
  );
}
