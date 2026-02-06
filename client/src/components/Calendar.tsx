import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  getRokuyo,
  getLuckyDays,
  getCelestialEventsForDate,
  getRetrogradeEventsForDate,
  getAllRetrogradeEvents,
} from '@/data/calendarData';
import { luckyDayMeanings, rokuyoMeanings, celestialEventMeanings, retrogradeEventMeanings } from '@/data/meanings';
import CalendarDay from './CalendarDay';
import DayDetail from './DayDetail';
import RetrogradeLegend from './RetrogradeLegend';
import BlogPreview from './BlogPreview';

/**
 * 2026年のカレンダーコンポーネント
 * デザイン: クラウドドリーム - ソフトミニマリズム
 * 特徴: パステルグラデーション、波状の区切り、細い黒線でシャープさを表現
 */
export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1)); // 2026年2月から開始
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

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

  // 現在の月に関係する逆行イベントを取得
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month, daysInMonth);

  // 全ての逆行イベント（2026年・2027年）
  const allRetrogradeEvents = getAllRetrogradeEvents();
  
  const relevantRetrogrades = allRetrogradeEvents.filter(event => {
    return event.startDate <= monthEnd && event.endDate >= monthStart;
  });

  // 月切り替え時の自動スクロール
  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentMonth]);

  const handlePrevMonth = () => {
    // 2026年1月より前には戻れないように制限
    if (year === 2026 && month === 0) return;
    setCurrentMonth(new Date(year, month - 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    // 2027年12月より先には進めないように制限
    if (year === 2027 && month === 11) return;
    setCurrentMonth(new Date(year, month + 1));
    setSelectedDay(null);
  };

  const monthName = new Date(year, month).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
  });

  // 逆行バーの描画用関数
  const getRetrogradeBarsForWeek = (weekIndex: number) => {
    const bars: JSX.Element[] = [];
    
    relevantRetrogrades.forEach((event, eventIndex) => {
      const effectiveStart = event.startDate < monthStart ? monthStart : event.startDate;
      const effectiveEnd = event.endDate > monthEnd ? monthEnd : event.endDate;

      const startDayOfMonth = effectiveStart.getDate();
      const endDayOfMonth = effectiveEnd.getDate();

      const startGridIndex = startDayOfWeek + startDayOfMonth - 1;
      const endGridIndex = startDayOfWeek + endDayOfMonth - 1;

      const startWeek = Math.floor(startGridIndex / 7);
      const endWeek = Math.floor(endGridIndex / 7);

      if (weekIndex >= startWeek && weekIndex <= endWeek) {
        const weekStartDay = weekIndex === startWeek ? startGridIndex % 7 : 0;
        const weekEndDay = weekIndex === endWeek ? endGridIndex % 7 : 6;

        const leftPercent = (weekStartDay / 7) * 100;
        const widthPercent = ((weekEndDay - weekStartDay + 1) / 7) * 100;

        const meaning = retrogradeEventMeanings[event.planet];

        bars.push(
          <div
            key={`${event.planet}-${weekIndex}`}
            className={`absolute h-2 rounded-full bg-gradient-to-r ${meaning?.color || 'from-purple-400 to-purple-200'} opacity-60 pointer-events-none`}
            style={{
              left: `calc(${leftPercent}% + 4px)`,
              width: `calc(${widthPercent}% - 8px)`,
              top: `${4 + eventIndex * 10}px`,
            }}
            title={`${meaning?.name}: ${event.startDate.toLocaleDateString('ja-JP')} 〜 ${event.endDate.toLocaleDateString('ja-JP')}`}
          />
        );
      }
    });

    return bars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-15% via-purple-50 via-35% to-blue-100 py-8 px-4">
      {/* 背景装飾: 雲のような半透明パターン */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <filter id="blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>
          </defs>
          {/* 雲のような曲線パターン - ライトブルーの分量を大幅増加 */}
          <path
            d="M 0 100 Q 300 50 600 100 T 1200 100 L 1200 0 L 0 0 Z"
            fill="rgba(255, 200, 220, 0.10)"
            filter="url(#blur)"
          />
          <path
            d="M 0 250 Q 300 180 600 250 T 1200 250 L 1200 150 L 0 150 Z"
            fill="rgba(200, 190, 255, 0.10)"
            filter="url(#blur)"
          />
          <path
            d="M 0 400 Q 300 320 600 400 T 1200 400 L 1200 300 L 0 300 Z"
            fill="rgba(168, 216, 255, 0.25)"
            filter="url(#blur)"
          />
          <path
            d="M 0 550 Q 300 470 600 550 T 1200 550 L 1200 450 L 0 450 Z"
            fill="rgba(147, 197, 253, 0.30)"
            filter="url(#blur)"
          />
          <path
            d="M 0 700 Q 300 620 600 700 T 1200 700 L 1200 600 L 0 600 Z"
            fill="rgba(135, 206, 250, 0.35)"
            filter="url(#blur)"
          />
          <path
            d="M 0 850 Q 300 770 600 850 T 1200 850 L 1200 750 L 0 750 Z"
            fill="rgba(173, 216, 230, 0.30)"
            filter="url(#blur)"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto" ref={calendarRef}>
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">
            Celestial Calendar
          </h1>
          <p className="text-sm text-gray-500 mb-2">開運・吉日＆天体カレンダー</p>
          <p className="text-lg text-gray-600">2026年〜2027年の吉日と天体イベント</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* カレンダー部分 */}
          <div className="lg:col-span-2">
            <Card className="p-4 sm:p-6 shadow-lg border-2 border-gray-200">
              {/* 月送りコントロール */}
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevMonth}
                  disabled={year === 2026 && month === 0}
                  className="border-gray-300 hover:bg-blue-100 disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{monthName}</h2>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNextMonth}
                  disabled={year === 2027 && month === 11}
                  className="border-gray-300 hover:bg-blue-100 disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              {/* 逆行期間の凡例 */}
              {relevantRetrogrades.length > 0 && (
                <RetrogradeLegend retrogrades={relevantRetrogrades} />
              )}

              {/* 曜日ヘッダー */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
                  <div
                    key={day}
                    className={`text-center font-bold py-2 text-xs sm:text-sm ${
                      index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-700'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* カレンダーグリッド */}
              <div className="space-y-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="relative">
                    {/* 逆行バー */}
                    {getRetrogradeBarsForWeek(weekIndex)}
                    
                    {/* 日付グリッド */}
                    <div className="grid grid-cols-7 gap-1 relative z-10">
                      {week.map((day, dayIndex) => (
                        <CalendarDay
                          key={dayIndex}
                          day={day}
                          isSelected={selectedDay?.toDateString() === day?.toDateString()}
                          onSelect={setSelectedDay}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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
          
          {/* 天体イベント凡例 */}
          <h4 className="text-lg font-bold text-gray-800 mt-6 mb-3">天体イベント</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(celestialEventMeanings).map(([key, { name, emoji }]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="text-lg">{emoji}</span>
                <span className="text-sm text-gray-700">{name}</span>
              </div>
            ))}
          </div>

          {/* 惑星逆行凡例 */}
          <h4 className="text-lg font-bold text-gray-800 mt-6 mb-3">惑星逆行</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(retrogradeEventMeanings).map(([key, { name, color }]) => (
              <div key={key} className="flex items-center gap-2">
                <div className={`w-8 h-2 rounded-full bg-gradient-to-r ${color}`} />
                <span className="text-sm text-gray-700">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ブログプレビュー */}
        <BlogPreview />
      </div>
    </div>
  );
}
