import { useState } from 'react';
import Header from './components/Header';
import Map from './components/Map';
import ShopList from './components/ShopList';
import ShopDetails from './components/ShopDetails';
import { coffeeShops } from './data/coffeeShops';
import type { CoffeeShop } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'map' | 'list'>('map');
  const [selectedShop, setSelectedShop] = useState<CoffeeShop | null>(null);

  const handleToggleView = () => {
    setCurrentView(currentView === 'map' ? 'list' : 'map');
  };

  const handleShopClick = (shop: CoffeeShop) => {
    setSelectedShop(shop);
  };

  const handleCloseDetails = () => {
    setSelectedShop(null);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header currentView={currentView} onToggleView={handleToggleView} />

      <div className="flex-1 flex overflow-hidden">
        {/* 主内容区域 */}
        <div className="flex-1 overflow-auto">
          {currentView === 'map' ? (
            <Map coffeeShops={coffeeShops} onShopClick={handleShopClick} />
          ) : (
            <ShopList shops={coffeeShops} onShopClick={handleShopClick} />
          )}
        </div>

        {/* 侧边栏详情 */}
        {selectedShop && (
          <ShopDetails shop={selectedShop} onClose={handleCloseDetails} />
        )}
      </div>
    </div>
  );
}

export default App;
