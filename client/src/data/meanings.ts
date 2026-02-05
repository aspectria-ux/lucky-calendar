/**
 * 吉日、六曜、天体イベントの説明
 */

export const luckyDayMeanings: Record<string, { name: string; description: string; color: string }> = {
  'ichiryu-manbai': {
    name: '一粒万倍日',
    description: 'わずかなものが万倍にも増えるとされる吉日。新しい事業の開始、投資、貯金の開始に最適。',
    color: 'from-pink-300 to-pink-100',
  },
  'tensha': {
    name: '天赦日',
    description: '天が万物の罪を赦す日とされ、暦の上で最高の吉日。すべての事柄に吉。',
    color: 'from-purple-300 to-purple-100',
  },
  'taian': {
    name: '大安',
    description: '六曜の中で最も吉とされる日。結婚式、入籍、契約など、すべての事柄に吉。',
    color: 'from-blue-300 to-blue-100',
  },
  'tori': {
    name: '寅の日',
    description: '十二支の寅の日。金運が高まるとされ、財布の新調や金銭に関する事柄に吉。',
    color: 'from-orange-300 to-orange-100',
  },
  'mi': {
    name: '巳の日',
    description: '十二支の巳の日。弁財天と縁がある日とされ、商売繁盛、金運向上に吉。',
    color: 'from-green-300 to-green-100',
  },
  'mi-mi': {
    name: '己巳の日',
    description: '巳の日の中でも特に吉とされる日。金運が最高潮に達するとされる。',
    color: 'from-emerald-400 to-emerald-200',
  },
  'tatsu': {
    name: '辰の日',
    description: '十二支の辰の日。新しい事業や計画の開始に吉。',
    color: 'from-yellow-300 to-yellow-100',
  },
  'koshi': {
    name: '甲子の日',
    description: '十干十二支の組み合わせで最初の日。新しい始まりに最適な吉日。',
    color: 'from-indigo-300 to-indigo-100',
  },
  'fushojuju': {
    name: '不成就日',
    description: '何事も成就しないとされる凶日。重要な決定や新しい事業の開始は避けるべき。',
    color: 'from-gray-300 to-gray-100',
  },
};

export const rokuyoMeanings: Record<string, { name: string; description: string }> = {
  'taian': {
    name: '大安',
    description: 'すべてに吉。最も縁起の良い日。',
  },
  'tomobiki': {
    name: '友引',
    description: '友を引く日。友人との約束や結婚に吉。ただし葬式は避けるべき。',
  },
  'senbu': {
    name: '先負',
    description: '先んずれば負ける。午後は吉、午前は凶。',
  },
  'butsumetu': {
    name: '仏滅',
    description: '仏も滅する日とされ、六曜の中で最も凶。重要な事柄は避けるべき。',
  },
  'akakuchi': {
    name: '赤口',
    description: '赤い口。昼時は吉、朝夕は凶。訴訟に吉。',
  },
  'senkatsu': {
    name: '先勝',
    description: '先んずれば勝つ。午前は吉、午後は凶。',
  },
};

export const celestialEventMeanings: Record<string, { name: string; description: string; emoji: string }> = {
  'new-moon': {
    name: '新月',
    description: '月が太陽と同じ方向にある時。新しいことを始めるのに適した時期。',
    emoji: '🌑',
  },
  'full-moon': {
    name: '満月',
    description: '月が地球と太陽の間にある時。完成、成就、感情が高ぶる時期。',
    emoji: '🌕',
  },
  'first-quarter': {
    name: '上弦',
    description: '月が満ちていく時期。成長、発展、行動に適した時期。',
    emoji: '🌓',
  },
  'last-quarter': {
    name: '下弦',
    description: '月が欠けていく時期。整理、リセット、反省に適した時期。',
    emoji: '🌗',
  },
};

export const retrogradeEventMeanings: Record<string, { name: string; description: string }> = {
  'mercury': {
    name: '水星逆行',
    description: 'コミュニケーション、移動、契約に影響。誤解や遅延が起きやすい時期。',
  },
  'venus': {
    name: '金星逆行',
    description: '愛情、金銭、人間関係に影響。内省と再評価の時期。',
  },
};
