import { Promotion } from '../types/promotion';

// Mock promotional banners data
// In future, this can be replaced with API calls
export const fetchPromotions = async (): Promise<Promotion[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: '1',
      title: 'Great Deals on Food',
      subtitle: 'Special offers today!',
      imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
      buttonText: 'Shop Now',
      buttonAction: 'navigate:ProductList',
      type: 'offer',
      active: true,
      priority: 1,
    },
    {
      id: '2',
      title: 'Fresh Vegetables',
      subtitle: 'Organic & Local',
      imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800',
      buttonText: 'Explore',
      buttonAction: 'navigate:ProductList:category:Vegetables',
      type: 'banner',
      active: true,
      priority: 2,
    },
  ];
};

// Future: Real API call
export const fetchPromotionsFromAPI = async (): Promise<Promotion[]> => {
  // TODO: Replace with actual API endpoint
  // const response = await fetch('/api/promotions');
  // const data = await response.json();
  // return data;
  
  // For now, use mock data
  return fetchPromotions();
};


