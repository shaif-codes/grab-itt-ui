import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, typography, spacing } from '@constants';
import { Ionicons } from '@expo/vector-icons';
import Button from './Button';
import Tag from './tag';
import { TAGS } from '@constants/tags';
import { BUTTONS } from '@constants/button';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string, quantity: number) => void;
  onProductPress: (productId: string) => void;
  compact?: boolean;
  horizontal?: boolean;
}

export default function ProductCard({ product, onAddToCart, onProductPress, compact = false, horizontal = false }: ProductCardProps) {
  return (
    <View style={horizontal ? styles.horizontalCard : styles.productCard}>
      <TouchableOpacity 
        activeOpacity={0.9}
        onPress={() => onProductPress(product.id)}
      >
        <View style={styles.productImageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          {product.discount && (
            <Tag 
              text={`${product.discount}% off`} 
              type={TAGS.ERROR} 
              extraStyle={styles.discountBadge} 
            />
          )}
          {!product.inStock && (
            <View style={styles.outOfStockOverlay}>
              <Text style={styles.outOfStockText}>Out of Stock</Text>
            </View>
          )}
        </View>
        
        <View style={[styles.productInfo, compact && styles.compactProductInfo]}>
          <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
          <Text style={styles.productCategory}>{product.category}</Text>
          
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color={colors.warning} />
            <Text style={styles.ratingText}>{product.rating}</Text>
            <Text style={styles.reviewsText}>({product.reviews})</Text>
          </View>
          
          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>₹{product.price}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Add to Cart"
          onPress={() => onAddToCart(product.id, 1)}
          type={BUTTONS.PRIMARY}
          extraButtonStyle={styles.addToCartButton}
          extraTextStyle={styles.addToCartText}
          disabled={!product.inStock}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productCard: {
    width: '48%',
    backgroundColor: colors.background.primary,
    borderRadius: spacing.borderRadius.lg,
    marginBottom: spacing.padding.md,
    elevation: 2,
    shadowColor: colors.shadow.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  horizontalCard: {
    flex: 1,
    backgroundColor: colors.background.primary,
    borderRadius: spacing.borderRadius.lg,
    marginBottom: spacing.padding.md,
    elevation: 2,
    shadowColor: colors.shadow.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  productImageContainer: {
    position: 'relative',
    height: 120,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outOfStockText: {
    ...typography.textStyles.captionBold,
    color: colors.white,
  },
  productInfo: {
    padding: spacing.padding.sm,
  },
  compactProductInfo: {
    paddingHorizontal: spacing.padding.xs,
    paddingVertical: spacing.padding.sm,
  },
  productName: {
    ...typography.textStyles.cardTitle,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  productCategory: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    gap: spacing.xs,
  },
  ratingText: {
    ...typography.textStyles.caption,
    color: colors.text.primary,
    fontWeight: '600',
  },
  reviewsText: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  currentPrice: {
    ...typography.textStyles.body,
    color: colors.text.primary,
    fontWeight: '700',
  },
  originalPrice: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
    textDecorationLine: 'line-through',
  },
  buttonContainer: {
    paddingHorizontal: spacing.padding.sm,
    paddingBottom: spacing.padding.sm,
  },
  addToCartButton: {
    paddingVertical: spacing.padding.xs,
    paddingHorizontal: spacing.padding.sm,
  },
  addToCartText: {
    fontSize: 12,
  },
});
