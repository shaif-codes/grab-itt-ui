import React, { useState, useMemo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { colors, spacing } from '@constants';
import Header from '@components/Header';
import ProductCard, { Product } from '@components/ProductCard';
import FilterModal, { FilterOptions } from '@components/FilterModal';
import ProductSearchBar from '@components/ProductSearchBar';
import SortOptions from '@components/SortOptions';
import ResultsHeader from '@components/ResultsHeader';
import { ProductListScreenNavigationProp } from '../types/navigation';

// Mock product data
const mockProducts: Product[] = [
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
];

interface ProductListProps {
  navigation: ProductListScreenNavigationProp;
}

export default function ProductList({ navigation }: ProductListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<FilterOptions>({
    category: ['All'],
    priceRange: { min: 0, max: 1000 },
    rating: 0,
    inStock: false,
  });

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter((product) => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = filters.category.includes('All') || filters.category.includes(product.category);

      // Price filter
      const matchesPrice = product.price >= filters.priceRange.min && product.price <= filters.priceRange.max;

      // Rating filter
      const matchesRating = product.rating >= filters.rating;

      // Stock filter
      const matchesStock = !filters.inStock || product.inStock;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesStock;
    });

    // Sort products
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [searchQuery, filters, sortBy, sortOrder]);

  const handleAddToCart = (productId: string) => {
    console.log('Added to cart:', productId);
    // TODO: Implement add to cart functionality
  };

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetail', { productId });
  };

  const clearFilters = () => {
    setFilters({
      category: ['All'],
      priceRange: { min: 0, max: 1000 },
      rating: 0,
      inStock: false,
    });
    setSearchQuery('');
  };

  const hasActiveFilters = Boolean(searchQuery) || 
    filters.category.length > 1 || 
    filters.rating > 0 || 
    filters.inStock;

  const renderProductCard = ({ item }: { item: Product }) => (
    <ProductCard 
      product={item} 
      onAddToCart={handleAddToCart}
      onProductPress={handleProductPress}
    />
  );

  return (
    <View style={styles.container}>
      <Header headerHeading="Products" onlyBadges={true} />
      
      <ProductSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFilterPress={() => setShowFilters(true)}
      />

      <SortOptions
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={(newSortBy, newSortOrder) => {
          setSortBy(newSortBy);
          setSortOrder(newSortOrder);
        }}
      />

      <ResultsHeader
        resultsCount={filteredProducts.length}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
      />

      <FlatList
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.productRow}
      />

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={clearFilters}
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
  productList: {
    paddingHorizontal: spacing.padding.md,
    paddingBottom: spacing.padding.xl,
  },
  productRow: {
    justifyContent: 'space-between',
  },
});