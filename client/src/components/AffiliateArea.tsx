import { Card } from '@/components/ui/card';
import { ExternalLink, Sparkles } from 'lucide-react';

interface AffiliateAreaProps {
  luckyDayType?: string;
}

/**
 * 詳細パネル内のアフィリエイトエリア
 * 吉日の種類に応じたおすすめ商品・サービスを表示
 */
export default function AffiliateArea({ luckyDayType }: AffiliateAreaProps) {
  // 吉日タイプに応じたおすすめ情報
  const getRecommendations = () => {
    switch (luckyDayType) {
      case 'ichiryu-manbai':
        return {
          title: '一粒万倍日におすすめ',
          items: [
            { name: '開運財布', description: '金運アップに最適な財布' },
            { name: '投資入門書', description: '資産形成の第一歩に' },
          ],
        };
      case 'tensha':
        return {
          title: '天赦日におすすめ',
          items: [
            { name: '開運グッズ', description: '最高の吉日に新しいスタートを' },
            { name: '縁起物', description: '幸運を呼び込むアイテム' },
          ],
        };
      case 'tori':
        return {
          title: '寅の日におすすめ',
          items: [
            { name: '金運財布', description: '虎柄・黄色の財布が吉' },
            { name: '貯金箱', description: '貯蓄を始めるのに最適' },
          ],
        };
      case 'mi':
      case 'mi-mi':
        return {
          title: '巳の日におすすめ',
          items: [
            { name: '弁財天グッズ', description: '商売繁盛・金運向上に' },
            { name: '蛇モチーフ', description: '金運の象徴' },
          ],
        };
      default:
        return {
          title: '開運アイテム',
          items: [
            { name: 'パワーストーン', description: '運気アップに' },
            { name: '開運カレンダー', description: '毎日の吉凶をチェック' },
          ],
        };
    }
  };

  const recommendations = getRecommendations();

  return (
    <div className="mt-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-blue-600" />
        <h4 className="text-sm font-semibold text-gray-700">{recommendations.title}</h4>
      </div>
      
      <div className="space-y-2">
        {recommendations.items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-white rounded border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer group"
          >
            <div>
              <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600">
                {item.name}
              </p>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
          </div>
        ))}
      </div>

      <p className="text-[10px] text-gray-400 mt-3 text-center">
        ※ アフィリエイトリンクを設定できます
      </p>
    </div>
  );
}
