/**
 * 2026年〜2027年の暦データ
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

// 2027年の朔弦望（新月・満月など）- 国立天文台暦計算室より
export const celestialEvents2027: CelestialEvent[] = [
  // 1月
  { type: 'new-moon', date: new Date(2027, 0, 8), time: '05:24' },
  { type: 'first-quarter', date: new Date(2027, 0, 16), time: '05:35' },
  { type: 'full-moon', date: new Date(2027, 0, 22), time: '21:17' },
  { type: 'last-quarter', date: new Date(2027, 0, 29), time: '19:55' },
  // 2月
  { type: 'new-moon', date: new Date(2027, 1, 7), time: '00:56' },
  { type: 'first-quarter', date: new Date(2027, 1, 14), time: '16:58' },
  { type: 'full-moon', date: new Date(2027, 1, 21), time: '08:24' },
  { type: 'last-quarter', date: new Date(2027, 1, 28), time: '14:17' },
  // 3月
  { type: 'new-moon', date: new Date(2027, 2, 8), time: '18:29' },
  { type: 'first-quarter', date: new Date(2027, 2, 16), time: '01:25' },
  { type: 'full-moon', date: new Date(2027, 2, 22), time: '19:44' },
  { type: 'last-quarter', date: new Date(2027, 2, 30), time: '09:54' },
  // 4月
  { type: 'new-moon', date: new Date(2027, 3, 7), time: '08:51' },
  { type: 'first-quarter', date: new Date(2027, 3, 14), time: '07:57' },
  { type: 'full-moon', date: new Date(2027, 3, 21), time: '07:27' },
  { type: 'last-quarter', date: new Date(2027, 3, 29), time: '05:18' },
  // 5月
  { type: 'new-moon', date: new Date(2027, 4, 6), time: '19:59' },
  { type: 'first-quarter', date: new Date(2027, 4, 13), time: '13:44' },
  { type: 'full-moon', date: new Date(2027, 4, 20), time: '19:59' },
  { type: 'last-quarter', date: new Date(2027, 4, 28), time: '22:58' },
  // 6月
  { type: 'new-moon', date: new Date(2027, 5, 5), time: '04:40' },
  { type: 'first-quarter', date: new Date(2027, 5, 11), time: '19:56' },
  { type: 'full-moon', date: new Date(2027, 5, 19), time: '09:44' },
  { type: 'last-quarter', date: new Date(2027, 5, 27), time: '13:54' },
  // 7月
  { type: 'new-moon', date: new Date(2027, 6, 4), time: '12:02' },
  { type: 'first-quarter', date: new Date(2027, 6, 11), time: '03:39' },
  { type: 'full-moon', date: new Date(2027, 6, 19), time: '00:45' },
  { type: 'last-quarter', date: new Date(2027, 6, 27), time: '01:55' },
  // 8月
  { type: 'new-moon', date: new Date(2027, 7, 2), time: '19:05' },
  { type: 'first-quarter', date: new Date(2027, 7, 9), time: '13:54' },
  { type: 'full-moon', date: new Date(2027, 7, 17), time: '16:29' },
  { type: 'last-quarter', date: new Date(2027, 7, 25), time: '11:27' },
  // 9月
  { type: 'new-moon', date: new Date(2027, 8, 1), time: '02:41' },
  { type: 'first-quarter', date: new Date(2027, 8, 8), time: '03:31' },
  { type: 'full-moon', date: new Date(2027, 8, 16), time: '08:04' },
  { type: 'last-quarter', date: new Date(2027, 8, 23), time: '19:20' },
  { type: 'new-moon', date: new Date(2027, 8, 30), time: '11:36' },
  // 10月
  { type: 'first-quarter', date: new Date(2027, 9, 7), time: '20:47' },
  { type: 'full-moon', date: new Date(2027, 9, 15), time: '22:47' },
  { type: 'last-quarter', date: new Date(2027, 9, 23), time: '02:29' },
  { type: 'new-moon', date: new Date(2027, 9, 29), time: '22:37' },
  // 11月
  { type: 'first-quarter', date: new Date(2027, 10, 6), time: '17:00' },
  { type: 'full-moon', date: new Date(2027, 10, 14), time: '12:26' },
  { type: 'last-quarter', date: new Date(2027, 10, 21), time: '09:48' },
  { type: 'new-moon', date: new Date(2027, 10, 28), time: '12:24' },
  // 12月
  { type: 'first-quarter', date: new Date(2027, 11, 6), time: '14:22' },
  { type: 'full-moon', date: new Date(2027, 11, 14), time: '01:09' },
  { type: 'last-quarter', date: new Date(2027, 11, 20), time: '18:11' },
  { type: 'new-moon', date: new Date(2027, 11, 28), time: '05:12' },
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

// 2027年の惑星逆行
export const retrogradeEvents2027: RetrogradeEvent[] = [
  // 水星逆行
  { planet: 'mercury', startDate: new Date(2027, 1, 9), endDate: new Date(2027, 2, 3) },
  { planet: 'mercury', startDate: new Date(2027, 5, 10), endDate: new Date(2027, 6, 4) },
  { planet: 'mercury', startDate: new Date(2027, 9, 7), endDate: new Date(2027, 9, 28) },
  // 2027年は金星逆行なし
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
const startDate2026 = new Date(2026, 0, 1); // 2026年1月1日
const startRokuyo = 'senkatsu'; // 先勝
const startRokuyoIndex = rokuyo.indexOf(startRokuyo);

/**
 * 指定された日付の六曜を取得
 * 六曜は旧暦に基づくため、正確には旧暦変換が必要だが、
 * ここでは簡易的に新暦の月初めでリセットする方式を採用
 */
export function getRokuyo(date: Date): RokuYoType {
  // 旧暦の月によって六曜の開始が変わる
  // 簡易的に新暦の月で計算（実際は旧暦変換が必要）
  const month = date.getMonth();
  const day = date.getDate();
  
  // 各月の1日の六曜（旧暦に基づく簡易版）
  // 1月・7月: 先勝, 2月・8月: 友引, 3月・9月: 先負, 4月・10月: 仏滅, 5月・11月: 大安, 6月・12月: 赤口
  const monthStartRokuyo = [
    0, // 1月: 先勝
    1, // 2月: 友引
    2, // 3月: 先負
    3, // 4月: 仏滅
    4, // 5月: 大安
    5, // 6月: 赤口
    0, // 7月: 先勝
    1, // 8月: 友引
    2, // 9月: 先負
    3, // 10月: 仏滅
    4, // 11月: 大安
    5, // 12月: 赤口
  ];
  
  const startIndex = monthStartRokuyo[month];
  const index = (startIndex + day - 1) % 6;
  return rokuyo[index];
}

/**
 * 2026年〜2027年の吉日データ（年・月ごと）
 * 出典: 池田工芸WEB本店、各種信頼できる暦サイト
 */
export const luckyDaysData: Record<number, Record<number, Record<number, LuckyDayType[]>>> = {
  // 2026年
  2026: {
    // 1月
    0: {
      5: ['ichiryu-manbai'],
      6: ['ichiryu-manbai'],
      9: ['tori'],
      12: ['mi'],
      18: ['ichiryu-manbai'],
      21: ['tori'],
      24: ['mi-mi'],
      30: ['ichiryu-manbai'],
    },
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
  },
  // 2027年
  2027: {
    // 1月
    0: {
      3: ['ichiryu-manbai'],
      7: ['fushojuju'],
      8: ['ichiryu-manbai'],
      10: ['tori'],
      13: ['mi'],
      15: ['fushojuju'],
      16: ['ichiryu-manbai'],
      22: ['tori'],
      23: ['fushojuju'],
      25: ['mi-mi'],
      28: ['ichiryu-manbai'],
      31: ['fushojuju'],
    },
    // 2月
    1: {
      3: ['tori'],
      6: ['mi'],
      9: ['ichiryu-manbai'],
      12: ['ichiryu-manbai'],
      15: ['tori'],
      18: ['mi'],
      21: ['ichiryu-manbai'],
      24: ['ichiryu-manbai'],
      27: ['tori'],
    },
    // 3月
    2: {
      2: ['mi'],
      5: ['ichiryu-manbai'],
      8: ['ichiryu-manbai'],
      11: ['tori'],
      14: ['mi-mi'],
      17: ['ichiryu-manbai', 'tensha'],
      20: ['ichiryu-manbai'],
      23: ['tori'],
      26: ['mi'],
      29: ['ichiryu-manbai'],
    },
    // 4月
    3: {
      1: ['ichiryu-manbai'],
      4: ['tori'],
      7: ['mi'],
      13: ['ichiryu-manbai'],
      16: ['tori'],
      19: ['mi'],
      25: ['ichiryu-manbai'],
      28: ['tori'],
    },
    // 5月
    4: {
      1: ['mi'],
      7: ['ichiryu-manbai'],
      10: ['tori'],
      13: ['mi-mi'],
      16: ['tensha', 'ichiryu-manbai'],
      19: ['ichiryu-manbai'],
      22: ['tori'],
      25: ['mi'],
      31: ['ichiryu-manbai'],
    },
    // 6月
    5: {
      3: ['tori'],
      6: ['mi'],
      12: ['ichiryu-manbai'],
      15: ['tori'],
      18: ['mi'],
      24: ['ichiryu-manbai'],
      27: ['tori'],
      30: ['mi'],
    },
    // 7月
    6: {
      6: ['ichiryu-manbai'],
      9: ['tori'],
      12: ['mi-mi'],
      15: ['tensha', 'ichiryu-manbai'],
      18: ['ichiryu-manbai'],
      21: ['tori'],
      24: ['mi'],
      30: ['ichiryu-manbai'],
    },
    // 8月
    7: {
      2: ['tori'],
      5: ['mi'],
      11: ['ichiryu-manbai'],
      14: ['tori'],
      17: ['mi'],
      23: ['ichiryu-manbai'],
      26: ['tori'],
      29: ['mi'],
    },
    // 9月
    8: {
      4: ['ichiryu-manbai'],
      7: ['tori'],
      10: ['mi-mi'],
      13: ['tensha', 'ichiryu-manbai'],
      16: ['ichiryu-manbai'],
      19: ['tori'],
      22: ['mi'],
      28: ['ichiryu-manbai'],
    },
    // 10月
    9: {
      1: ['tori'],
      4: ['mi'],
      10: ['ichiryu-manbai'],
      13: ['tori'],
      16: ['mi'],
      22: ['ichiryu-manbai'],
      25: ['tori'],
      28: ['mi'],
    },
    // 11月
    10: {
      3: ['ichiryu-manbai'],
      6: ['tori'],
      9: ['mi-mi'],
      12: ['tensha', 'ichiryu-manbai'],
      15: ['ichiryu-manbai'],
      18: ['tori'],
      21: ['mi'],
      27: ['ichiryu-manbai'],
      30: ['tori'],
    },
    // 12月
    11: {
      3: ['mi'],
      9: ['ichiryu-manbai'],
      12: ['tori'],
      15: ['mi'],
      21: ['ichiryu-manbai'],
      24: ['tori'],
      27: ['mi'],
    },
  },
};

/**
 * 指定された日付の吉日を取得
 */
export function getLuckyDays(date: Date): LuckyDayType[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  
  if (luckyDaysData[year] && luckyDaysData[year][month] && luckyDaysData[year][month][day]) {
    return luckyDaysData[year][month][day];
  }
  return [];
}

/**
 * 指定された日付の天体イベントを取得
 */
export function getCelestialEventsForDate(date: Date): CelestialEventType[] {
  const year = date.getFullYear();
  const events = year === 2027 ? celestialEvents2027 : celestialEvents2026;
  
  return events
    .filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === date.getFullYear() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getDate() === date.getDate();
    })
    .map(event => event.type);
}

/**
 * 全ての逆行イベントを取得
 */
export function getAllRetrogradeEvents(): RetrogradeEvent[] {
  return [...retrogradeEvents2026, ...retrogradeEvents2027];
}

/**
 * 指定された日付の逆行惑星を取得
 */
export function getRetrogradeEventsForDate(date: Date): RetrogradePlanetType[] {
  const allEvents = getAllRetrogradeEvents();
  
  return allEvents
    .filter(event => date >= event.startDate && date <= event.endDate)
    .map(event => event.planet);
}
