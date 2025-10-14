import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { colors, spacing } from '@constants';
import Header from '@components/Header';
import ProductImageGallery from '@components/ProductImageGallery';
import ProductInfo from '@components/ProductInfo';
import ProductActions from '@components/ProductActions';
import ProductReviews from '@components/ProductReviews';
import RelatedProducts from '@components/RelatedProducts';
import { ProductListScreenNavigationProp } from '../types/navigation';

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

// Mock detailed product data
const mockProductDetail: ProductDetail = {
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
};

// Mock reviews data
const mockReviews = [
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
];

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
  const [isInWishlist, setIsInWishlist] = useState(false);
  const productId = route?.params?.productId || '1';
  
  // In a real app, you would fetch product data based on productId
  const product = mockProductDetail;

  const handleAddToCart = (productId: string, quantity: number) => {
    Alert.alert(
      'Added to Cart',
      `Added ${quantity} ${product.name} to your cart`,
      [{ text: 'OK' }]
    );
    // TODO: Implement actual cart functionality
  };

  const handleBuyNow = (productId: string, quantity: number) => {
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
    setIsInWishlist(!isInWishlist);
    Alert.alert(
      isInWishlist ? 'Removed from Wishlist' : 'Added to Wishlist',
      `${product.name} ${isInWishlist ? 'removed from' : 'added to'} your wishlist`
    );
  };

  const handleRelatedProductPress = (relatedProductId: string) => {
    // TODO: Navigate to the related product detail
    console.log('Navigate to product:', relatedProductId);
  };

  return (
    <View style={styles.container}>
      <Header 
        headerHeading="Product Details" 
        onlyBadges={true}
        // showBackButton={true}
        // onBackPress={() => navigation.goBack()}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ProductImageGallery 
          images={product.images} 
          productName={product.name} 
        />
        
        <ProductInfo product={product} />
        
        <ProductReviews 
          reviews={mockReviews}
          averageRating={product.rating}
          totalReviews={product.reviews}
        />
        
        <RelatedProducts 
          products={mockRelatedProducts}
          onProductPress={handleRelatedProductPress}
          onAddToCart={handleAddToCart}
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
