import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '@constants';
import { Ionicons } from '@expo/vector-icons';
import Header from '@components/Header';
import { Product } from '@components/ProductCard';

interface SearchScreenProps {
  navigation: any;
}

// Mock products for search
const allProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Organic Tomatoes',
    price: 45,
    originalPrice: 60,
    image: 'https://images.unsplash.com/photo-1546470427-e26264be0f40?w=300',
    category: 'Vegetables',
    rating: 4.5,
    reviews: 128,
    inStock: true,
    discount: 25,
  },
  {
    id: '2',
    name: 'Premium Basmati Rice',
    price: 180,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300',
    category: 'Groceries',
    rating: 4.8,
    reviews: 89,
    inStock: true,
  },
  {
    id: '3',
    name: 'Fresh Milk 1L',
    price: 55,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300',
    category: 'Dairy',
    rating: 4.3,
    reviews: 156,
    inStock: true,
  },
  {
    id: '4',
    name: 'Organic Spinach',
    price: 35,
    originalPrice: 45,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300',
    category: 'Vegetables',
    rating: 4.2,
    reviews: 67,
    inStock: false,
    discount: 22,
  },
  {
    id: '5',
    name: 'Whole Wheat Bread',
    price: 25,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300',
    category: 'Bakery',
    rating: 4.6,
    reviews: 203,
    inStock: true,
  },
  {
    id: '6',
    name: 'Fresh Carrots',
    price: 25,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300',
    category: 'Vegetables',
    rating: 4.4,
    reviews: 89,
    inStock: true,
  },
  {
    id: '7',
    name: 'Organic Bell Peppers',
    price: 55,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300',
    category: 'Vegetables',
    rating: 4.6,
    reviews: 45,
    inStock: true,
  },
  {
    id: '8',
    name: 'Fresh Eggs (Dozen)',
    price: 120,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300',
    category: 'Dairy',
    rating: 4.7,
    reviews: 234,
    inStock: true,
  },
];

export default function SearchScreen({ navigation }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetail', { productId });
  };

  const handleAddToCart = (productId: string) => {
    console.log('Add to cart:', productId);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.productItem}
      onPress={() => handleProductPress(item.id)}
    >
      <View style={styles.productContent}>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productCategory}>{item.category}</Text>
          <Text style={styles.productPrice}>₹{item.price}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={colors.text.secondary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header 
        headerHeading="Search" 
        onlyBadges={true}
        showBackBtn={true}
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color={colors.text.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor={colors.text.secondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={true}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {searchQuery.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="search-outline" size={80} color={colors.text.secondary} />
          <Text style={styles.emptyText}>Start typing to search</Text>
        </View>
      ) : filteredProducts.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="search-outline" size={80} color={colors.text.secondary} />
          <Text style={styles.emptyText}>No results found</Text>
          <Text style={styles.emptySubtext}>Try searching for something else</Text>
        </View>
      ) : (
        <>
          <Text style={styles.resultsText}>
            Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </Text>
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.resultsList}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingTop: spacing.padding.lg,
  },
  searchContainer: {
    paddingHorizontal: spacing.padding.md,
    marginBottom: spacing.padding.md,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.borderRadius.lg,
    paddingHorizontal: spacing.padding.md,
    paddingVertical: spacing.padding.sm,
    gap: spacing.padding.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.textStyles.body,
    color: colors.text.primary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.padding.xl,
  },
  emptyText: {
    ...typography.textStyles.h3,
    color: colors.text.primary,
    marginTop: spacing.padding.lg,
  },
  emptySubtext: {
    ...typography.textStyles.body,
    color: colors.text.secondary,
    marginTop: spacing.padding.sm,
  },
  resultsText: {
    ...typography.textStyles.body,
    color: colors.text.secondary,
    paddingHorizontal: spacing.padding.md,
    marginBottom: spacing.padding.sm,
  },
  resultsList: {
    paddingHorizontal: spacing.padding.md,
    paddingBottom: spacing.padding.xl,
  },
  productItem: {
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.borderRadius.lg,
    marginBottom: spacing.padding.sm,
    overflow: 'hidden',
  },
  productContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.padding.md,
  },
  productInfo: {
    flex: 1,
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
  productPrice: {
    ...typography.textStyles.body,
    color: colors.primary,
    fontWeight: '700',
  },
});

