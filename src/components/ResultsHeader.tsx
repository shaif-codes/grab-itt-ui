import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '@constants';

interface ResultsHeaderProps {
  resultsCount: number;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export default function ResultsHeader({ 
  resultsCount, 
  hasActiveFilters, 
  onClearFilters 
}: ResultsHeaderProps) {
  return (
    <View style={styles.resultsContainer}>
      <Text style={styles.resultsText}>
        {resultsCount} products found
      </Text>
      {hasActiveFilters && (
        <TouchableOpacity onPress={onClearFilters}>
          <Text style={styles.clearFiltersText}>Clear filters</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  resultsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.padding.md,
    paddingVertical: spacing.padding.sm,
  },
  resultsText: {
    ...typography.textStyles.bodySmall,
    color: colors.text.secondary,
  },
  clearFiltersText: {
    ...typography.textStyles.caption,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});
