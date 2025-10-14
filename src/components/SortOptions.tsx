import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '@constants';
import { Ionicons } from '@expo/vector-icons';

type SortBy = 'name' | 'price' | 'rating';
type SortOrder = 'asc' | 'desc';

interface SortOptionsProps {
  sortBy: SortBy;
  sortOrder: SortOrder;
  onSortChange: (sortBy: SortBy, sortOrder: SortOrder) => void;
}

export default function SortOptions({ sortBy, sortOrder, onSortChange }: SortOptionsProps) {
  const handleSortPress = (option: SortBy) => {
    if (sortBy === option) {
      onSortChange(option, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      onSortChange(option, 'asc');
    }
  };

  return (
    <View style={styles.sortContainer}>
      <Text style={styles.sortLabel}>Sort by:</Text>
      <View style={styles.sortOptions}>
        {(['name', 'price', 'rating'] as const).map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.sortOption,
              sortBy === option && styles.sortOptionActive
            ]}
            onPress={() => handleSortPress(option)}
          >
            <Text style={[
              styles.sortOptionText,
              sortBy === option && styles.sortOptionTextActive
            ]}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </Text>
            {sortBy === option && (
              <Ionicons 
                name={sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'} 
                size={12} 
                color={colors.primary} 
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.padding.md,
    paddingVertical: spacing.padding.sm,
    gap: spacing.sm,
  },
  sortLabel: {
    ...typography.textStyles.bodySmall,
    color: colors.text.secondary,
  },
  sortOptions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  sortOption: {
    paddingHorizontal: spacing.padding.sm,
    paddingVertical: spacing.padding.xs,
    borderRadius: spacing.borderRadius.sm,
    backgroundColor: colors.background.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  sortOptionActive: {
    backgroundColor: colors.primaryLight,
  },
  sortOptionText: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
  },
  sortOptionTextActive: {
    color: colors.text.primary,
    fontWeight: '600',
  },
});
