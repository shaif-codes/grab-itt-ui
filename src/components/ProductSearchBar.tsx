import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '@constants';
import { Ionicons } from '@expo/vector-icons';

interface ProductSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterPress: () => void;
}

export default function ProductSearchBar({ 
  searchQuery, 
  onSearchChange, 
  onFilterPress 
}: ProductSearchBarProps) {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <Ionicons name="search" size={20} color={colors.search.placeholder} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor={colors.search.placeholder}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
      </View>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={onFilterPress}
      >
        <Ionicons name="options" size={20} color={colors.text.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.padding.md,
    paddingVertical: spacing.padding.sm,
    gap: spacing.sm,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.search.background,
    paddingHorizontal: spacing.padding.md,
    paddingVertical: spacing.padding.sm,
    borderRadius: spacing.borderRadius.lg,
  },
  searchInput: {
    ...typography.textStyles.searchPlaceholder,
    color: colors.search.text,
    marginLeft: spacing.sm,
    flex: 1,
  },
  filterButton: {
    padding: spacing.padding.sm,
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.borderRadius.lg,
  },
});
