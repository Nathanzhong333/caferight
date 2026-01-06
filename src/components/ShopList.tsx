import type { CoffeeShop } from '../types';

interface ShopListProps {
  shops: CoffeeShop[];
  onShopClick: (shop: CoffeeShop) => void;
}

const ShopList = ({ shops, onShopClick }: ShopListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {shops.map((shop) => (
        <div
          key={shop.id}
          onClick={() => onShopClick(shop)}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
        >
          <div className="h-48 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
            <span className="text-6xl">☕</span>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">{shop.name}</h3>
            <div className="flex items-center mb-2">
              <span className="text-yellow-500 mr-2">
                {'⭐'.repeat(Math.round(shop.rating))}
              </span>
              <span className="text-gray-600 text-sm">{shop.rating}</span>
              <span className="ml-auto text-amber-700">
                {'¥'.repeat(shop.priceLevel)}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {shop.address}
            </p>
            {shop.description && (
              <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                {shop.description}
              </p>
            )}
            {shop.specialties && shop.specialties.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {shop.specialties.slice(0, 3).map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            )}
            {shop.masterReviews && shop.masterReviews.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <span className="text-xs text-amber-700 font-semibold flex items-center">
                  <span className="mr-1">👨‍🍳</span>
                  {shop.masterReviews.length} 位大师评鉴
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopList;
