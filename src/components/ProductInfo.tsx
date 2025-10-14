import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, typography, spacing } from '@constants';
import { Ionicons } from '@expo/vector-icons';
import Tag from './tag';
import { TAGS } from '@constants/tags';

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    category: string;
    rating: number;
    reviews: number;
    inStock: boolean;
    discount?: number;
    description?: string;
    features?: string[];
    weight?: string;
    brand?: string;
  };
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <View style={styles.container}>
      {/* Product Title and Category */}
      <View style={styles.header}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.category}>{product.category}</Text>
      </View>

      {/* Rating and Reviews */}
      <View style={styles.ratingContainer}>
        <View style={styles.ratingStars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons
              key={star}
              name={star <= Math.floor(product.rating) ? 'star' : 'star-outline'}
              size={16}
              color={colors.warning}
            />
          ))}
        </View>
        <Text style={styles.ratingText}>{product.rating}</Text>
        <Text style={styles.reviewsText}>({product.reviews} reviews)</Text>
      </View>

      {/* Price Section */}
      <View style={styles.priceSection}>
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>₹{product.price}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
          )}
          {product.discount && (
            <Tag 
              text={`${product.discount}% OFF`} 
              type={TAGS.ERROR}
              extraStyle={styles.discountTag}
            />
          )}
        </View>
        <View style={styles.stockContainer}>
          <Ionicons 
            name={product.inStock ? "checkmark-circle" : "close-circle"} 
            size={20} 
            color={product.inStock ? colors.success : colors.error} 
          />
          <Text style={[
            styles.stockText,
            { color: product.inStock ? colors.success : colors.error }
          ]}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </Text>
        </View>
      </View>

      {/* Product Details */}
      <ScrollView style={styles.detailsContainer} showsVerticalScrollIndicator={false}>
        {/* Description */}
        {product.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description} numberOfLines={showFullDescription ? undefined : 3}>
              {product.description}
            </Text>
            {product.description.length > 100 && (
              <TouchableOpacity onPress={toggleDescription}>
                <Text style={styles.readMoreText}>
                  {showFullDescription ? 'Read Less' : 'Read More'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            {product.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Ionicons name="checkmark" size={16} color={colors.success} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Additional Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Brand:</Text>
            <Text style={styles.infoValue}>{product.brand || 'Generic'}</Text>
          </View>
          {product.weight && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Weight:</Text>
              <Text style={styles.infoValue}>{product.weight}</Text>
            </View>
          )}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Category:</Text>
            <Text style={styles.infoValue}>{product.category}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    paddingHorizontal: spacing.padding.md,
  },
  header: {
    marginBottom: spacing.padding.sm,
  },
  productName: {
    ...typography.textStyles.h2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  category: {
    ...typography.textStyles.bodySmall,
    color: colors.text.secondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.padding.md,
    gap: spacing.sm,
  },
  ratingStars: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    ...typography.textStyles.bodySmall,
    color: colors.text.primary,
    fontWeight: '600',
  },
  reviewsText: {
    ...typography.textStyles.bodySmall,
    color: colors.text.secondary,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.padding.lg,
    paddingBottom: spacing.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.primary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  currentPrice: {
    ...typography.textStyles.h3,
    color: colors.text.primary,
    fontWeight: '700',
  },
  originalPrice: {
    ...typography.textStyles.body,
    color: colors.text.secondary,
    textDecorationLine: 'line-through',
  },
  discountTag: {
    marginLeft: spacing.sm,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  stockText: {
    ...typography.textStyles.captionBold,
  },
  detailsContainer: {
    maxHeight: 300,
  },
  section: {
    marginBottom: spacing.padding.md,
  },
  sectionTitle: {
    ...typography.textStyles.cardTitle,
    color: colors.text.primary,
    marginBottom: spacing.padding.sm,
  },
  description: {
    ...typography.textStyles.body,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  readMoreText: {
    ...typography.textStyles.caption,
    color: colors.primary,
    marginTop: spacing.xs,
    textDecorationLine: 'underline',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    gap: spacing.sm,
  },
  featureText: {
    ...typography.textStyles.body,
    color: colors.text.secondary,
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.padding.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  infoLabel: {
    ...typography.textStyles.bodySmall,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  infoValue: {
    ...typography.textStyles.bodySmall,
    color: colors.text.primary,
  },
});
