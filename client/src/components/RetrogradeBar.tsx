import { retrogradeEvents2026, RetrogradeEvent } from '@/data/calendarData';
import { retrogradeEventMeanings } from '@/data/meanings';

interface RetrogradeBarProps {
  year: number;
  month: number;
  daysInMonth: number;
  startDayOfWeek: number;
}

/**
 * 惑星逆行の期間を帯（バー）で表示するコンポーネント
 * カレンダーグリッドの上に重ねて表示
 */
export default function RetrogradeBar({ year, month, daysInMonth, startDayOfWeek }: RetrogradeBarProps) {
  // 現在の月に関係する逆行イベントを取得
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month, daysInMonth);

  // 2026年と2027年の逆行イベントを結合（後で2027年データを追加）
  const allRetrogradeEvents = [...retrogradeEvents2026];

  const relevantEvents = allRetrogradeEvents.filter((event: RetrogradeEvent) => {
    // 逆行期間がこの月と重なるかチェック
    return event.startDate <= monthEnd && event.endDate >= monthStart;
  });

  if (relevantEvents.length === 0) {
    return null;
  }

  // 日付からグリッド位置を計算
  const getGridPosition = (date: Date): { week: number; day: number } => {
    const dayOfMonth = date.getDate();
    const gridIndex = startDayOfWeek + dayOfMonth - 1;
    return {
      week: Math.floor(gridIndex / 7),
      day: gridIndex % 7,
    };
  };

  // 逆行バーのスタイルを計算
  const calculateBarStyle = (event: RetrogradeEvent) => {
    const effectiveStart = event.startDate < monthStart ? monthStart : event.startDate;
    const effectiveEnd = event.endDate > monthEnd ? monthEnd : event.endDate;

    const startPos = getGridPosition(effectiveStart);
    const endPos = getGridPosition(effectiveEnd);

    return {
      startPos,
      endPos,
      effectiveStart,
      effectiveEnd,
    };
  };

  // 週ごとにバーを分割して描画
  const renderBarsForEvent = (event: RetrogradeEvent, eventIndex: number) => {
    const { startPos, endPos } = calculateBarStyle(event);
    const meaning = retrogradeEventMeanings[event.planet];
    const bars = [];

    for (let week = startPos.week; week <= endPos.week; week++) {
      const weekStartDay = week === startPos.week ? startPos.day : 0;
      const weekEndDay = week === endPos.week ? endPos.day : 6;

      // バーの幅と位置を計算（パーセンテージ）
      const leftPercent = (weekStartDay / 7) * 100;
      const widthPercent = ((weekEndDay - weekStartDay + 1) / 7) * 100;

      // 週の行の高さに基づいてtopを計算
      // 各週の行は約80px（aspect-square + gap）
      const rowHeight = 80; // おおよその高さ
      const topOffset = week * rowHeight + 60; // ヘッダー分のオフセット

      bars.push(
        <div
          key={`${event.planet}-${week}`}
          className={`absolute h-3 rounded-full bg-gradient-to-r ${meaning?.color || 'from-purple-400 to-purple-200'} opacity-70 z-10 pointer-events-none`}
          style={{
            left: `${leftPercent}%`,
            width: `${widthPercent}%`,
            top: `${topOffset}px`,
            marginTop: eventIndex * 14 + 'px', // 複数の逆行が重なる場合にずらす
          }}
          title={`${meaning?.name}: ${event.startDate.toLocaleDateString('ja-JP')} 〜 ${event.endDate.toLocaleDateString('ja-JP')}`}
        />
      );
    }

    return bars;
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {relevantEvents.map((event, index) => renderBarsForEvent(event, index))}
    </div>
  );
}
