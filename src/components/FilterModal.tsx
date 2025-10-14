import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import { colors, typography, spacing } from '@constants';
import { Ionicons } from '@expo/vector-icons';
import Button from './Button';
import { BUTTONS, BUTTONS_STYLES } from '@constants/button';

export interface FilterOptions {
  category: string[];
  priceRange: { min: number; max: number };
  rating: number;
  inStock: boolean;
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
}

const categories = ['All', 'Vegetables', 'Groceries', 'Dairy', 'Bakery', 'Fruits'];

export default function FilterModal({ 
  visible, 
  onClose, 
  filters, 
  onFiltersChange, 
  onClearFilters 
}: FilterModalProps) {
  
  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter(c => c !== category)
      : [...filters.category, category];
    
    onFiltersChange({
      ...filters,
      category: newCategories
    });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({
      ...filters,
      rating: filters.rating === rating ? 0 : rating
    });
  };

  const handleStockToggle = () => {
    onFiltersChange({
      ...filters,
      inStock: !filters.inStock
    });
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.filterModal}>
        <View style={styles.filterHeader}>
          <Text style={styles.filterTitle}>Filters</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.filterContent}>
          {/* Category Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Category</Text>
            <View style={styles.categoryContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryChip,
                    filters.category.includes(category) && styles.categoryChipActive
                  ]}
                  onPress={() => handleCategoryToggle(category)}
                >
                  <Text style={[
                    styles.categoryChipText,
                    filters.category.includes(category) && styles.categoryChipTextActive
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Price Range Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Price Range</Text>
            <View style={styles.priceRangeContainer}>
              <Text style={styles.priceRangeText}>
                ₹{filters.priceRange.min} - ₹{filters.priceRange.max}
              </Text>
            </View>
          </View>

          {/* Rating Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Minimum Rating</Text>
            <View style={styles.ratingFilterContainer}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <TouchableOpacity
                  key={rating}
                  style={[
                    styles.ratingChip,
                    filters.rating >= rating && styles.ratingChipActive
                  ]}
                  onPress={() => handleRatingChange(rating)}
                >
                  <Ionicons 
                    name="star" 
                    size={16} 
                    color={filters.rating >= rating ? colors.warning : colors.gray[400]} 
                  />
                  <Text style={[
                    styles.ratingChipText,
                    filters.rating >= rating && styles.ratingChipTextActive
                  ]}>
                    {rating}+
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Stock Filter */}
          <View style={styles.filterSection}>
            <TouchableOpacity
              style={styles.stockFilterContainer}
              onPress={handleStockToggle}
            >
              <Ionicons 
                name={filters.inStock ? "checkbox" : "square-outline"} 
                size={20} 
                color={filters.inStock ? colors.primary : colors.gray[400]} 
              />
              <Text style={styles.stockFilterText}>In Stock Only</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.filterActions}>
          <Button
            title="Clear All"
            onPress={onClearFilters}
            type={BUTTONS.PRIMARY}
          />
          <Button
            title="Apply Filters"
            onPress={onClose}
            type={BUTTONS.PRIMARY}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  filterModal: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.padding.md,
    paddingVertical: spacing.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.primary,
  },
  filterTitle: {
    ...typography.textStyles.h3,
    color: colors.text.primary,
  },
  filterContent: {
    flex: 1,
    paddingHorizontal: spacing.padding.md,
  },
  filterSection: {
    marginVertical: spacing.padding.md,
  },
  filterSectionTitle: {
    ...typography.textStyles.cardTitle,
    color: colors.text.primary,
    marginBottom: spacing.padding.sm,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: spacing.padding.md,
    paddingVertical: spacing.padding.sm,
    borderRadius: spacing.borderRadius.lg,
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryChipText: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
  },
  categoryChipTextActive: {
    color: colors.text.primary,
    fontWeight: '600',
  },
  priceRangeContainer: {
    paddingVertical: spacing.padding.md,
  },
  priceRangeText: {
    ...typography.textStyles.body,
    color: colors.text.primary,
  },
  ratingFilterContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  ratingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.padding.sm,
    paddingVertical: spacing.padding.xs,
    borderRadius: spacing.borderRadius.sm,
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.primary,
    gap: spacing.xs,
  },
  ratingChipActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  ratingChipText: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
  },
  ratingChipTextActive: {
    color: colors.text.primary,
    fontWeight: '600',
  },
  stockFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  stockFilterText: {
    ...typography.textStyles.body,
    color: colors.text.primary,
  },
  filterActions: {
    flexDirection: 'row',
    paddingHorizontal: spacing.padding.md,
    paddingVertical: spacing.padding.md,
    gap: spacing.padding.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.primary,
  },
  clearButton: {
    flex: 1,
    color: colors.text.primary,
    backgroundColor: colors.button.secondary,
  },
  applyButton: {
    flex: 1,
    color: colors.text.primary,
    backgroundColor: colors.button.secondary,
  },
});
