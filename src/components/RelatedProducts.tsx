import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '@constants';
import { Ionicons } from '@expo/vector-icons';
import ProductCard, { Product } from './ProductCard';

interface RelatedProductsProps {
  products: Product[];
  onProductPress: (productId: string) => void;
  onAddToCart: (productId: string, quantity: number) => void;
  onSeeAll?: () => void;
}

export default function RelatedProducts({ 
  products, 
  onProductPress, 
  onAddToCart,
  onSeeAll
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Related Products</Text>
        {onSeeAll && (
          <TouchableOpacity style={styles.seeAllButton} onPress={onSeeAll}>
            <Text style={styles.seeAllText}>See All</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productsContainer}
      >
        {products.map((product, index) => (
          <View key={index} style={styles.productItem}>
            <ProductCard
              product={product} 
              onAddToCart={onAddToCart}
              onProductPress={onProductPress}
              compact={false}
              horizontal={true}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    paddingVertical: spacing.padding.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.padding.md,
    marginBottom: spacing.padding.md,
  },
  title: {
    ...typography.textStyles.h3,
    color: colors.text.primary,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  seeAllText: {
    ...typography.textStyles.body,
    color: colors.primary,
    fontWeight: '600',
  },
  productsContainer: {
    paddingHorizontal: spacing.padding.sm,
    paddingRight: spacing.padding.md,
    gap: spacing.padding.sm,
  },
  productItem: {
    width: 200,
    marginRight: spacing.padding.sm,
  },
});
