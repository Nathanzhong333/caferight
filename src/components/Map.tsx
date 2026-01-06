import { useEffect, useRef, useState } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import type { CoffeeShop } from '../types';

interface MapProps {
  coffeeShops: CoffeeShop[];
  onShopClick?: (shop: CoffeeShop) => void;
}

const Map = ({ coffeeShops, onShopClick }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [AMap, setAMap] = useState<any>(null);

  useEffect(() => {
    // 加载高德地图
    AMapLoader.load({
      key: 'YOUR_AMAP_KEY', // 需要在高德地图开放平台申请
      version: '2.0',
      plugins: ['AMap.Marker', 'AMap.InfoWindow'],
    })
      .then((AMapInstance) => {
        setAMap(AMapInstance);

        if (mapRef.current) {
          const mapInstance = new AMapInstance.Map(mapRef.current, {
            zoom: 11,
            center: [116.4074, 39.9042], // 北京市中心
            viewMode: '3D',
          });

          setMap(mapInstance);
        }
      })
      .catch((e) => {
        console.error('地图加载失败:', e);
      });

    return () => {
      map?.destroy();
    };
  }, []);

  useEffect(() => {
    if (!map || !AMap) return;

    // 清除现有标记
    map.clearMap();

    // 为每个咖啡店添加标记
    coffeeShops.forEach((shop) => {
      const marker = new AMap.Marker({
        position: [shop.location.lng, shop.location.lat],
        title: shop.name,
        icon: new AMap.Icon({
          size: new AMap.Size(32, 32),
          image: '☕', // 咖啡图标，实际使用中应该用图片URL
          imageSize: new AMap.Size(32, 32),
        }),
      });

      // 点击标记显示信息窗口
      marker.on('click', () => {
        const infoWindow = new AMap.InfoWindow({
          content: `
            <div style="padding: 10px;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${shop.name}</h3>
              <p style="margin: 4px 0; color: #666;">${shop.address}</p>
              <p style="margin: 4px 0;">评分: ${'⭐'.repeat(Math.round(shop.rating))}</p>
              <p style="margin: 4px 0;">价格: ${'¥'.repeat(shop.priceLevel)}</p>
              ${shop.description ? `<p style="margin: 8px 0 0 0; color: #666;">${shop.description}</p>` : ''}
            </div>
          `,
          offset: new AMap.Pixel(0, -30),
        });
        infoWindow.open(map, marker.getPosition());

        if (onShopClick) {
          onShopClick(shop);
        }
      });

      map.add(marker);
    });
  }, [map, AMap, coffeeShops, onShopClick]);

  return (
    <div
      ref={mapRef}
      className="w-full h-full"
      style={{ minHeight: '400px' }}
    />
  );
};

export default Map;
