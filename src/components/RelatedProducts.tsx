import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '@constants';
import { Ionicons } from '@expo/vector-icons';
import ProductCard, { Product } from './ProductCard';

interface RelatedProductsProps {
  products: Product[];
  onProductPress: (productId: string) => void;
  onAddToCart: (productId: string, quantity: number) => void;
}

export default function RelatedProducts({ 
  products, 
  onProductPress, 
  onAddToCart 
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Related Products</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.primary} />
        </TouchableOpacity>
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
              compact={true}
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
  },
  productItem: {
    width: 160,
    marginRight: spacing.padding.sm,
    paddingRight: 0,
  },
});
