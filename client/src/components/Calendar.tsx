import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  getRokuyo,
  getLuckyDays,
  getCelestialEventsForDate,
  getRetrogradeEventsForDate,
} from '@/data/calendarData';
import { luckyDayMeanings, rokuyoMeanings, celestialEventMeanings, retrogradeEventMeanings } from '@/data/meanings';
import CalendarDay from './CalendarDay';
import DayDetail from './DayDetail';
import RetrogradeBars from './RetrogradeBars';

/**
 * 2026年のカレンダーコンポーネント
 * デザイン: クラウドドリーム - ソフトミニマリズム
 * 特徴: パステルグラデーション、波状の区切り、細い黒線でシャープさを表現
 */
export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1)); // 2026年2月から開始
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // 月の最初と最後の日を取得
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  // 月の最初の曜日（0=日, 1=月, ..., 6=土）
  const startDayOfWeek = firstDay.getDay();

  // カレンダーグリッドを作成
  const calendarDays: (Date | null)[] = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(new Date(year, month, i));
  }

  // 6週分になるまでパディング
  while (calendarDays.length % 7 !== 0) {
    calendarDays.push(null);
  }

  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1));
    setSelectedDay(null);
  };

  const monthName = new Date(year, month).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-100 via-40% to-blue-100 py-8 px-4">
      {/* 背景装飾: 雲のような半透明パターン */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <filter id="blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>
          </defs>
          {/* 雲のような曲線パターン */}
          <path
            d="M 0 200 Q 300 100 600 200 T 1200 200 L 1200 0 L 0 0 Z"
            fill="rgba(255, 182, 217, 0.15)"
            filter="url(#blur)"
          />
          <path
            d="M 0 400 Q 300 300 600 400 T 1200 400 L 1200 300 L 0 300 Z"
            fill="rgba(212, 181, 255, 0.12)"
            filter="url(#blur)"
          />
          <path
            d="M 0 600 Q 300 500 600 600 T 1200 600 L 1200 500 L 0 500 Z"
            fill="rgba(168, 216, 255, 0.3)"
            filter="url(#blur)"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            Celestial Calendar
          </h1>
          <p className="text-sm text-gray-600 mb-2">開運・吉日＆天体カレンダー</p>
          <p className="text-lg text-gray-600">2026年の吉日と天体イベント</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* カレンダー部分 */}
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-lg border-2 border-gray-200">
              {/* 月送りコントロール */}
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevMonth}
                  className="border-gray-300 hover:bg-pink-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                <h2 className="text-2xl font-bold text-gray-800">{monthName}</h2>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNextMonth}
                  className="border-gray-300 hover:bg-pink-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              {/* 曜日ヘッダー */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
                  <div
                    key={day}
                    className="text-center font-bold text-gray-700 py-2 text-sm"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* カレンダーグリッド */}
              <div className="space-y-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-cols-7 gap-1">
                    {week.map((day, dayIndex) => (
                      <CalendarDay
                        key={dayIndex}
                        day={day}
                        isSelected={selectedDay?.toDateString() === day?.toDateString()}
                        onSelect={setSelectedDay}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* 逆行期間の帯表示 */}
              <RetrogradeBars month={month} year={year} />
            </Card>
          </div>

          {/* 詳細パネル */}
          <div className="lg:col-span-1">
            {selectedDay ? (
              <DayDetail date={selectedDay} />
            ) : (
              <Card className="p-6 shadow-lg border-2 border-gray-200 h-full flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500 text-sm">
                    カレンダーの日付をクリックして詳細を表示
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* 凡例 */}
        <div className="mt-8 bg-white rounded-lg p-6 border-2 border-gray-200 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">凡例</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(luckyDayMeanings).map(([key, { name, color }]) => (
              <div key={key} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded border-2 border-gray-800 bg-gradient-to-br ${color}`} />
                <span className="text-sm text-gray-700">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
