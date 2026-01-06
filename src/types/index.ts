export interface CoffeeShop {
  id: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  description?: string;
  images?: string[];
  rating: number;
  priceLevel: 1 | 2 | 3 | 4 | 5; // 1-5星级价格
  specialties: string[]; // 特色咖啡
  reviews: Review[];
  masterReviews: MasterReview[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  content: string;
  images?: string[];
  createdAt: string;
  tags?: string[];
}

export interface MasterReview {
  id: string;
  masterId: string;
  masterName: string;
  masterTitle: string; // 咖啡评鉴大师
  rating: number;
  content: string;
  images?: string[];
  createdAt: string;
  detailedScores?: {
    taste: number;      // 口感
    aroma: number;      // 香气
    environment: number; // 环境
    service: number;    // 服务
    value: number;      // 性价比
  };
  featured?: boolean; // 是否为精选评价
}

export interface UserExperience {
  shopId: string;
  userId: string;
  visited: boolean;
  favorite: boolean;
  notes?: string;
  visitDate?: string;
}
