import type { CoffeeShop } from '../types';

interface ShopDetailsProps {
  shop: CoffeeShop | null;
  onClose: () => void;
}

const ShopDetails = ({ shop, onClose }: ShopDetailsProps) => {
  if (!shop) return null;

  return (
    <div className="w-full md:w-96 h-full bg-white shadow-lg overflow-y-auto">
      <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
        <h2 className="text-xl font-bold">{shop.name}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
      </div>

      <div className="p-4">
        {/* 基本信息 */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">{'⭐'.repeat(Math.round(shop.rating))}</span>
            <span className="text-lg font-semibold">{shop.rating}</span>
          </div>
          <div className="text-gray-600 mb-1">
            {'¥'.repeat(shop.priceLevel)} • {shop.address}
          </div>
          {shop.description && (
            <p className="text-gray-700 mt-3">{shop.description}</p>
          )}
        </div>

        {/* 特色咖啡 */}
        {shop.specialties && shop.specialties.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">特色推荐</h3>
            <div className="flex flex-wrap gap-2">
              {shop.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 大师评鉴 */}
        {shop.masterReviews && shop.masterReviews.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <span className="mr-2">👨‍🍳</span>
              大师评鉴
            </h3>
            {shop.masterReviews.map((review) => (
              <div
                key={review.id}
                className={`border rounded-lg p-4 mb-3 ${
                  review.featured ? 'border-amber-400 bg-amber-50' : 'border-gray-200'
                }`}
              >
                {review.featured && (
                  <div className="inline-block bg-amber-400 text-white text-xs px-2 py-1 rounded mb-2">
                    精选评价
                  </div>
                )}
                <div className="flex items-center mb-2">
                  <div>
                    <div className="font-semibold">{review.masterName}</div>
                    <div className="text-sm text-gray-600">{review.masterTitle}</div>
                  </div>
                  <div className="ml-auto">
                    <span className="text-lg font-semibold">{review.rating}</span>
                    <span className="text-gray-500">/5</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">{review.content}</p>
                {review.detailedScores && (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">口感</span>
                      <span className="font-semibold">{review.detailedScores.taste}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">香气</span>
                      <span className="font-semibold">{review.detailedScores.aroma}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">环境</span>
                      <span className="font-semibold">{review.detailedScores.environment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">服务</span>
                      <span className="font-semibold">{review.detailedScores.service}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">性价比</span>
                      <span className="font-semibold">{review.detailedScores.value}</span>
                    </div>
                  </div>
                )}
                <div className="text-xs text-gray-500 mt-2">{review.createdAt}</div>
              </div>
            ))}
          </div>
        )}

        {/* 用户评价 */}
        {shop.reviews && shop.reviews.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">用户评价</h3>
            {shop.reviews.map((review) => (
              <div key={review.id} className="border-b pb-3 mb-3 last:border-b-0">
                <div className="flex items-center mb-2">
                  <span className="font-semibold mr-2">{review.userName}</span>
                  <span className="text-sm">{'⭐'.repeat(review.rating)}</span>
                </div>
                <p className="text-gray-700 mb-2">{review.content}</p>
                {review.tags && (
                  <div className="flex flex-wrap gap-1">
                    {review.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="text-xs text-gray-500 mt-1">{review.createdAt}</div>
              </div>
            ))}
          </div>
        )}

        {/* 操作按钮 */}
        <div className="sticky bottom-0 bg-white pt-4 border-t">
          <button className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 mb-2">
            标记我的体验
          </button>
          <button className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50">
            添加到收藏
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;
