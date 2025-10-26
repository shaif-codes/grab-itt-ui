import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { colors, spacing } from '@constants';
import Header from '@components/Header';
import ProductImageGallery from '@components/ProductImageGallery';
import ProductInfo from '@components/ProductInfo';
import ProductActions from '@components/ProductActions';
import ProductReviews from '@components/ProductReviews';
import RelatedProducts from '@components/RelatedProducts';
import LoadingSpinner from '@components/LoadingSpinner';
import ErrorView from '@components/ErrorView';
import { ProductListScreenNavigationProp } from '../types/navigation';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToCart } from '../store/cartSlice';
import { toggleFavorite } from '../store/favoritesSlice';

// Extended Product interface for detail view
interface ProductDetail {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  discount?: number;
  description?: string;
  features?: string[];
  weight?: string;
  brand?: string;
}

// Mock detailed products database
const mockProductsDatabase: ProductDetail[] = [
  {
    id: '1',
    name: 'Fresh Organic Tomatoes',
    price: 45,
    originalPrice: 60,
    images: [
      'https://images.unsplash.com/photo-1546470427-e26264be0f40?w=400',
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400',
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400',
    ],
    category: 'Vegetables',
    rating: 4.5,
    reviews: 128,
    inStock: true,
    discount: 25,
    description: 'Fresh, organic tomatoes grown locally without pesticides. Perfect for salads, cooking, and making sauces. These tomatoes are hand-picked at peak ripeness to ensure the best flavor and nutritional value.',
    features: [
      '100% Organic Certified',
      'No Pesticides Used',
      'Locally Grown',
      'Hand-picked at Peak Ripeness',
      'Rich in Vitamins A & C',
    ],
    weight: '500g',
    brand: 'Green Valley Farms',
  },
  {
    id: '2',
    name: 'Organic Spinach',
    price: 35,
    originalPrice: 45,
    images: [
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
      'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=400',
      'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400',
    ],
    category: 'Vegetables',
    rating: 4.2,
    reviews: 67,
    inStock: true,
    discount: 22,
    description: 'Fresh, crisp organic spinach packed with nutrients. Perfect for salads, smoothies, and cooking. Rich in iron, vitamins A, C, and K.',
    features: [
      '100% Organic Certified',
      'High in Iron & Vitamin K',
      'Fresh & Crispy',
      'Locally Grown',
      'No Chemicals',
    ],
    weight: '250g',
    brand: 'Fresh Farms',
  },
  {
    id: '3',
    name: 'Fresh Carrots',
    price: 25,
    images: [
      'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
      'https://images.unsplash.com/photo-1598170845082-7b7eb3cb83fc?w=400',
      'https://images.unsplash.com/photo-1598170804402-45d72f40e3c7?w=400',
    ],
    category: 'Vegetables',
    rating: 4.4,
    reviews: 89,
    inStock: true,
    description: 'Fresh, crunchy carrots packed with beta-carotene and vitamins. Perfect for snacking, salads, and cooking. Great source of vitamin A.',
    features: [
      'Rich in Vitamin A',
      'Fresh & Crunchy',
      'Locally Grown',
      'No Preservatives',
      'Great for Juicing',
    ],
    weight: '500g',
    brand: 'Garden Fresh',
  },
  {
    id: '4',
    name: 'Organic Bell Peppers',
    price: 55,
    images: [
      'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400',
      'https://images.unsplash.com/photo-1563565375-5b59e5a6e4b5?w=400',
      'https://images.unsplash.com/photo-1622206147954-e31d23c82b30?w=400',
    ],
    category: 'Vegetables',
    rating: 4.6,
    reviews: 45,
    inStock: true,
    description: 'Colorful organic bell peppers packed with flavor and nutrients. Perfect for salads, stir-fries, and grilling. Rich in vitamin C and antioxidants.',
    features: [
      '100% Organic',
      'High in Vitamin C',
      'Colorful & Fresh',
      'Locally Grown',
      'No Pesticides',
    ],
    weight: '300g',
    brand: 'Farm Fresh',
  },
];

// Function to get product by ID
const getProductById = (id: string): ProductDetail => {
  const product = mockProductsDatabase.find(p => p.id === id);
  return product || mockProductsDatabase[0]; // Return first product as fallback
};

// Mock reviews for different products
const mockReviewsDatabase: Record<string, Array<{
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}>> = {
  '1': [ // Tomatoes
    {
      id: '1',
      userName: 'Sarah Johnson',
      rating: 5,
      comment: 'Excellent quality tomatoes! Very fresh and flavorful. Perfect for my salads.',
      date: '2 days ago',
      helpful: 12,
    },
    {
      id: '2',
      userName: 'Mike Chen',
      rating: 4,
      comment: 'Good tomatoes, arrived fresh. Would order again.',
      date: '1 week ago',
      helpful: 8,
    },
    {
      id: '3',
      userName: 'Emily Davis',
      rating: 5,
      comment: 'Amazing quality! These are the best tomatoes I\'ve had in a while.',
      date: '2 weeks ago',
      helpful: 15,
    },
  ],
  '2': [ // Spinach
    {
      id: '1',
      userName: 'Lisa Anderson',
      rating: 5,
      comment: 'Fresh and crisp spinach! Great for my smoothies and salads.',
      date: '1 day ago',
      helpful: 9,
    },
    {
      id: '2',
      userName: 'David Wilson',
      rating: 4,
      comment: 'Good quality, but arrived slightly wilted. Still delicious though.',
      date: '3 days ago',
      helpful: 6,
    },
  ],
  '3': [ // Carrots
    {
      id: '1',
      userName: 'Robert Brown',
      rating: 5,
      comment: 'Perfect carrots! Fresh, crunchy, and sweet. Great for juicing.',
      date: '4 days ago',
      helpful: 11,
    },
    {
      id: '2',
      userName: 'Jennifer Taylor',
      rating: 5,
      comment: 'Amazing quality! My kids love these carrots.',
      date: '1 week ago',
      helpful: 7,
    },
  ],
  '4': [ // Bell Peppers
    {
      id: '1',
      userName: 'Michael Garcia',
      rating: 5,
      comment: 'Colorful and fresh bell peppers! Perfect for grilling.',
      date: '2 days ago',
      helpful: 8,
    },
    {
      id: '2',
      userName: 'Amanda Martinez',
      rating: 4,
      comment: 'Good quality peppers, very flavorful in my stir-fries.',
      date: '5 days ago',
      helpful: 5,
    },
  ],
};

// Function to get reviews by product ID
const getReviewsByProductId = (productId: string) => {
  return mockReviewsDatabase[productId] || mockReviewsDatabase['1'];
};

// Mock related products
const mockRelatedProducts = [
  {
    id: '2',
    name: 'Organic Spinach',
    price: 35,
    originalPrice: 45,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300',
    category: 'Vegetables',
    rating: 4.2,
    reviews: 67,
    inStock: true,
    discount: 22,
  },
  {
    id: '3',
    name: 'Fresh Carrots',
    price: 25,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300',
    category: 'Vegetables',
    rating: 4.4,
    reviews: 89,
    inStock: true,
  },
  {
    id: '4',
    name: 'Organic Bell Peppers',
    price: 55,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300',
    category: 'Vegetables',
    rating: 4.6,
    reviews: 45,
    inStock: true,
  },
];

interface ProductDetailProps {
  navigation: ProductListScreenNavigationProp;
  route?: {
    params?: {
      productId?: string;
    };
  };
}

export default function ProductDetail({ navigation, route }: ProductDetailProps) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.items);
  const productId = route?.params?.productId || '1';
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get product data based on productId
  const product = getProductById(productId);
  const reviews = getReviewsByProductId(productId);
  
  // Check if product is in favorites
  const isInWishlist = favorites.some(item => item.id === productId);

  // Simulate loading
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 600));
        setLoading(false);
      } catch (err) {
        setError('Failed to load product details');
        setLoading(false);
      }
    };
    loadProduct();
  }, [productId]);

  const handleAddToCart = (productId: string, quantity: number) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      quantity,
      inStock: product.inStock,
      category: product.category,
    }));
    
    Alert.alert(
      'Added to Cart',
      `Added ${quantity} ${product.name} to your cart`,
      [{ text: 'OK' }]
    );
  };

  const handleBuyNow = (productId: string, quantity: number) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      quantity,
      inStock: product.inStock,
      category: product.category,
    }));
    
    Alert.alert(
      'Buy Now',
      `Proceeding to checkout with ${quantity} ${product.name}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue', onPress: () => {
          // TODO: Navigate to checkout
          console.log('Navigate to checkout');
        }}
      ]
    );
  };

  const handleToggleWishlist = (productId: string) => {
    dispatch(toggleFavorite({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      category: product.category,
      rating: product.rating,
      reviews: product.reviews,
      inStock: product.inStock,
    }));
  };

  const handleRelatedProductPress = (relatedProductId: string) => {
    navigation.push('ProductDetail', { productId: relatedProductId });
    console.log('Navigate to product detail:', relatedProductId);
  };

  const handleSeeAllProducts = () => {
    navigation.navigate('ProductList', {});
  };

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const handleNotificationPress = () => {
    navigation.navigate('Notifications' as any);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header 
          headerHeading="Product Details" 
          onlyBadges={true}
          showBackBtn={true}
          onBackPress={() => navigation.goBack()}
        />
        <LoadingSpinner text="Loading product details..." fullScreen />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header 
          headerHeading="Product Details" 
          onlyBadges={true}
          showBackBtn={true}
          onBackPress={() => navigation.goBack()}
        />
        <ErrorView 
          message={error} 
          onRetry={() => {
            setError(null);
            setLoading(true);
            setTimeout(() => setLoading(false), 600);
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header 
        headerHeading="Product Details" 
        onlyBadges={true}
        showBackBtn={true}
        onBackPress={() => navigation.goBack()}
        onCartPress={handleCartPress}
        onNotificationPress={handleNotificationPress}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ProductImageGallery 
          images={product.images} 
          productName={product.name} 
        />
        
        <ProductInfo product={product} />
        
        <ProductReviews 
          reviews={reviews}
          averageRating={product.rating}
          totalReviews={product.reviews}
        />
        
        <RelatedProducts 
          products={mockRelatedProducts}
          onProductPress={handleRelatedProductPress}
          onAddToCart={handleAddToCart}
          onSeeAll={handleSeeAllProducts}
        />
      </ScrollView>
      
      <ProductActions
        productId={product.id}
        inStock={product.inStock}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onToggleWishlist={handleToggleWishlist}
        isInWishlist={isInWishlist}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingTop: spacing.padding.lg,
  },
  scrollView: {
    flex: 1,
  },
});
