/**
 * 2026年の暦データ
 * 出典: 国立天文台暦計算室、池田工芸WEB本店、各種信頼できる暦サイト
 */

// 吉日の種類
export type LuckyDayType = 
  | 'ichiryu-manbai' // 一粒万倍日
  | 'tensha' // 天赦日
  | 'taian' // 大安
  | 'tori' // 寅の日
  | 'mi' // 巳の日
  | 'mi-mi' // 己巳の日（巳の日の中でも特別）
  | 'tatsu' // 辰の日
  | 'koshi' // 甲子の日
  | 'fushojuju'; // 不成就日（凶日）

export type RokuYoType = 
  | 'taian' // 大安
  | 'tomobiki' // 友引
  | 'senbu' // 先負
  | 'butsumetu' // 仏滅
  | 'akakuchi' // 赤口
  | 'senkatsu'; // 先勝

export type CelestialEventType = 
  | 'new-moon' // 新月（朔）
  | 'full-moon' // 満月（望）
  | 'first-quarter' // 上弦
  | 'last-quarter'; // 下弦

export type RetrogradePlanetType = 
  | 'mercury' // 水星
  | 'venus'; // 金星

export interface CelestialEvent {
  type: CelestialEventType;
  date: Date;
  time?: string; // HH:mm形式
}

export interface RetrogradeEvent {
  planet: RetrogradePlanetType;
  startDate: Date;
  endDate: Date;
}

export interface CalendarDay {
  date: Date;
  day: number;
  month: number;
  year: number;
  rokuyo: RokuYoType;
  luckyDays: LuckyDayType[];
  celestialEvents: CelestialEventType[];
  retrogradeEvents: RetrogradePlanetType[];
}

// 2026年の朔弦望（新月・満月など）- 国立天文台暦計算室より
export const celestialEvents2026: CelestialEvent[] = [
  // 1月
  { type: 'full-moon', date: new Date(2026, 0, 3), time: '19:03' },
  { type: 'last-quarter', date: new Date(2026, 0, 11), time: '00:48' },
  { type: 'new-moon', date: new Date(2026, 0, 19), time: '04:52' },
  { type: 'first-quarter', date: new Date(2026, 0, 26), time: '13:47' },
  // 2月
  { type: 'full-moon', date: new Date(2026, 1, 2), time: '07:09' },
  { type: 'last-quarter', date: new Date(2026, 1, 9), time: '21:43' },
  { type: 'new-moon', date: new Date(2026, 1, 17), time: '21:01' },
  { type: 'first-quarter', date: new Date(2026, 1, 24), time: '21:28' },
  // 3月
  { type: 'full-moon', date: new Date(2026, 2, 3), time: '20:38' },
  { type: 'last-quarter', date: new Date(2026, 2, 11), time: '18:39' },
  { type: 'new-moon', date: new Date(2026, 2, 19), time: '10:23' },
  { type: 'first-quarter', date: new Date(2026, 2, 26), time: '04:18' },
  // 4月
  { type: 'full-moon', date: new Date(2026, 3, 2), time: '11:12' },
  { type: 'last-quarter', date: new Date(2026, 3, 10), time: '13:52' },
  { type: 'new-moon', date: new Date(2026, 3, 17), time: '20:52' },
  { type: 'first-quarter', date: new Date(2026, 3, 24), time: '11:32' },
  // 5月
  { type: 'full-moon', date: new Date(2026, 4, 2), time: '02:23' },
  { type: 'last-quarter', date: new Date(2026, 4, 10), time: '06:10' },
  { type: 'new-moon', date: new Date(2026, 4, 17), time: '05:01' },
  { type: 'first-quarter', date: new Date(2026, 4, 23), time: '20:11' },
  { type: 'full-moon', date: new Date(2026, 4, 31), time: '17:45' },
  // 6月
  { type: 'last-quarter', date: new Date(2026, 5, 8), time: '19:01' },
  { type: 'new-moon', date: new Date(2026, 5, 15), time: '11:54' },
  { type: 'first-quarter', date: new Date(2026, 5, 22), time: '06:55' },
  { type: 'full-moon', date: new Date(2026, 5, 30), time: '08:57' },
  // 7月
  { type: 'last-quarter', date: new Date(2026, 6, 8), time: '04:29' },
  { type: 'new-moon', date: new Date(2026, 6, 14), time: '18:44' },
  { type: 'first-quarter', date: new Date(2026, 6, 21), time: '20:06' },
  { type: 'full-moon', date: new Date(2026, 6, 29), time: '23:36' },
  // 8月
  { type: 'last-quarter', date: new Date(2026, 7, 6), time: '11:21' },
  { type: 'new-moon', date: new Date(2026, 7, 13), time: '02:37' },
  { type: 'first-quarter', date: new Date(2026, 7, 20), time: '11:46' },
  { type: 'full-moon', date: new Date(2026, 7, 28), time: '13:19' },
  // 9月
  { type: 'last-quarter', date: new Date(2026, 8, 4), time: '16:51' },
  { type: 'new-moon', date: new Date(2026, 8, 11), time: '12:27' },
  { type: 'first-quarter', date: new Date(2026, 8, 19), time: '05:44' },
  { type: 'full-moon', date: new Date(2026, 8, 27), time: '01:49' },
  // 10月
  { type: 'last-quarter', date: new Date(2026, 9, 3), time: '22:25' },
  { type: 'new-moon', date: new Date(2026, 9, 11), time: '00:50' },
  { type: 'first-quarter', date: new Date(2026, 9, 19), time: '01:13' },
  { type: 'full-moon', date: new Date(2026, 9, 26), time: '13:12' },
  // 11月
  { type: 'last-quarter', date: new Date(2026, 10, 2), time: '05:28' },
  { type: 'new-moon', date: new Date(2026, 10, 9), time: '16:02' },
  { type: 'first-quarter', date: new Date(2026, 10, 17), time: '20:48' },
  { type: 'full-moon', date: new Date(2026, 10, 24), time: '23:54' },
  // 12月
  { type: 'last-quarter', date: new Date(2026, 11, 1), time: '15:09' },
  { type: 'new-moon', date: new Date(2026, 11, 9), time: '09:52' },
  { type: 'first-quarter', date: new Date(2026, 11, 17), time: '14:43' },
  { type: 'full-moon', date: new Date(2026, 11, 24), time: '10:28' },
  { type: 'last-quarter', date: new Date(2026, 11, 31), time: '03:59' },
];

// 2026年の惑星逆行
export const retrogradeEvents2026: RetrogradeEvent[] = [
  // 水星逆行
  { planet: 'mercury', startDate: new Date(2026, 1, 26), endDate: new Date(2026, 2, 21) },
  { planet: 'mercury', startDate: new Date(2026, 5, 30), endDate: new Date(2026, 6, 24) },
  { planet: 'mercury', startDate: new Date(2026, 9, 24), endDate: new Date(2026, 10, 13) },
  // 金星逆行
  { planet: 'venus', startDate: new Date(2026, 9, 3), endDate: new Date(2026, 10, 14) },
];

// 六曜の周期（1日から始まる）
const rokuyo: RokuYoType[] = [
  'senkatsu', // 先勝
  'tomobiki', // 友引
  'senbu', // 先負
  'butsumetu', // 仏滅
  'taian', // 大安
  'akakuchi', // 赤口
];

// 2026年1月1日の六曜（先勝）から計算
const startDate = new Date(2026, 0, 1); // 2026年1月1日
const startRokuyo = 'senkatsu'; // 先勝
const startRokuyoIndex = rokuyo.indexOf(startRokuyo);

/**
 * 指定された日付の六曜を取得
 */
export function getRokuyo(date: Date): RokuYoType {
  const daysDiff = Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const index = (startRokuyoIndex + daysDiff) % 6;
  return rokuyo[index];
}

/**
 * 2026年の吉日データ（月ごと）
 * 出典: 池田工芸WEB本店、各種信頼できる暦サイト
 */
export const luckyDaysData: Record<number, Record<number, LuckyDayType[]>> = {
  // 2月
  1: {
    8: ['ichiryu-manbai'],
    9: ['tori'],
    12: ['mi'],
    13: ['ichiryu-manbai'],
    19: ['koshi'],
    20: ['ichiryu-manbai'],
    21: ['tori'],
    24: ['mi-mi'],
    25: ['ichiryu-manbai'],
    27: ['fushojuju'],
  },
  // 3月
  2: {
    4: ['ichiryu-manbai'],
    5: ['tensha', 'ichiryu-manbai', 'tori', 'taian'],
    7: ['fushojuju'],
    8: ['mi'],
    12: ['ichiryu-manbai'],
    15: ['fushojuju'],
    17: ['ichiryu-manbai', 'tori'],
    19: ['tatsu'],
    20: ['fushojuju', 'mi'],
    24: ['ichiryu-manbai'],
    28: ['fushojuju'],
    29: ['ichiryu-manbai', 'tori'],
  },
  // 4月
  3: {
    1: ['mi'],
    5: ['fushojuju'],
    8: ['ichiryu-manbai'],
    10: ['tori'],
    11: ['ichiryu-manbai'],
    13: ['fushojuju', 'mi'],
    17: ['fushojuju'],
    20: ['ichiryu-manbai', 'koshi'],
    23: ['tatsu'],
  },
  // 5月
  4: {
    2: ['ichiryu-manbai', 'tensha'],
    4: ['tensha', 'ichiryu-manbai'],
    5: ['fushojuju'],
    8: ['ichiryu-manbai'],
    12: ['ichiryu-manbai', 'tori'],
    13: ['fushojuju', 'mi'],
    20: ['ichiryu-manbai'],
    23: ['tatsu'],
    27: ['fushojuju'],
  },
  // 6月
  5: {
    2: ['ichiryu-manbai'],
    3: ['fushojuju'],
    6: ['ichiryu-manbai'],
    9: ['tori'],
    12: ['ichiryu-manbai'],
    14: ['fushojuju', 'mi'],
    17: ['ichiryu-manbai'],
    20: ['tatsu'],
    24: ['fushojuju'],
    29: ['ichiryu-manbai'],
  },
  // 7月
  6: {
    1: ['mi'],
    5: ['fushojuju'],
    8: ['ichiryu-manbai'],
    11: ['tori'],
    12: ['ichiryu-manbai'],
    14: ['fushojuju', 'mi'],
    19: ['tensha', 'ichiryu-manbai', 'taian'],
    22: ['tatsu'],
    26: ['fushojuju'],
    31: ['ichiryu-manbai'],
  },
  // 8月
  7: {
    2: ['ichiryu-manbai'],
    4: ['fushojuju'],
    7: ['ichiryu-manbai'],
    9: ['tori'],
    11: ['ichiryu-manbai'],
    13: ['fushojuju', 'mi'],
    16: ['ichiryu-manbai'],
    19: ['tatsu'],
    23: ['fushojuju'],
    28: ['ichiryu-manbai'],
  },
  // 9月
  8: {
    1: ['mi'],
    4: ['fushojuju'],
    6: ['ichiryu-manbai'],
    8: ['tori'],
    10: ['ichiryu-manbai'],
    12: ['fushojuju', 'mi'],
    15: ['ichiryu-manbai'],
    18: ['tatsu'],
    22: ['fushojuju'],
    27: ['ichiryu-manbai'],
  },
  // 10月
  9: {
    1: ['tensha', 'ichiryu-manbai'],
    3: ['fushojuju'],
    5: ['ichiryu-manbai'],
    7: ['tori'],
    9: ['ichiryu-manbai'],
    11: ['fushojuju', 'mi'],
    14: ['ichiryu-manbai'],
    17: ['tatsu'],
    21: ['fushojuju'],
    26: ['ichiryu-manbai'],
  },
  // 11月
  10: {
    2: ['mi'],
    4: ['fushojuju'],
    7: ['ichiryu-manbai'],
    9: ['tori'],
    11: ['ichiryu-manbai'],
    13: ['fushojuju', 'mi'],
    16: ['ichiryu-manbai'],
    20: ['tatsu'],
    24: ['fushojuju'],
    29: ['ichiryu-manbai'],
  },
  // 12月
  11: {
    1: ['ichiryu-manbai'],
    3: ['fushojuju'],
    6: ['ichiryu-manbai'],
    8: ['tori'],
    10: ['ichiryu-manbai'],
    12: ['fushojuju', 'mi'],
    16: ['tensha', 'ichiryu-manbai', 'koshi'],
    19: ['tatsu'],
    23: ['fushojuju'],
    28: ['ichiryu-manbai'],
  },
};

/**
 * 指定された日付の吉日を取得
 */
export function getLuckyDays(date: Date): LuckyDayType[] {
  const month = date.getMonth();
  const day = date.getDate();
  
  if (luckyDaysData[month] && luckyDaysData[month][day]) {
    return luckyDaysData[month][day];
  }
  return [];
}

/**
 * 指定された日付の天体イベントを取得
 */
export function getCelestialEventsForDate(date: Date): CelestialEventType[] {
  return celestialEvents2026
    .filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === date.getFullYear() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getDate() === date.getDate();
    })
    .map(event => event.type);
}

/**
 * 指定された日付の逆行惑星を取得
 */
export function getRetrogradeEventsForDate(date: Date): RetrogradePlanetType[] {
  return retrogradeEvents2026
    .filter(event => date >= event.startDate && date <= event.endDate)
    .map(event => event.planet);
}
