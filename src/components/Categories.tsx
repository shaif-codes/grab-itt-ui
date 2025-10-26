import { colors, spacing, typography } from "@constants";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface CategoriesProps {
  categories: {
    name: string;
    icon: keyof typeof Ionicons.glyphMap;
    description: string;
  }[];
  navigation: any;
}

export default function Categories({ categories, navigation }: CategoriesProps) {
  const handleCategoryPress = (categoryName: string) => {
    navigation.navigate('ProductList', { category: categoryName });
  };
  return (
    <View style={styles.categoriesContainer}>
      <Text style={styles.sectionTitle}>Categories</Text>
      <View style={styles.categoriesGrid}>
        {categories.map((category, index) => (
          <TouchableOpacity 
            style={styles.categoryCard} 
            key={index}
            onPress={() => handleCategoryPress(category.name)}
          >
          <View style={styles.categoryIcon}>
            <Ionicons name={category.icon} size={24} color={colors.text.primary} />
          </View>
          <Text style={styles.categoryTitle}>{category.name}</Text>
          <Text style={styles.categorySubtitle}>{category.description}</Text>
        </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoriesContainer: {
    paddingHorizontal: spacing.padding.md,
    marginBottom: spacing.padding.xl,
  },
  sectionTitle: {
    ...typography.textStyles.h3,
    color: colors.text.primary,
    marginBottom: spacing.padding.md,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    backgroundColor: colors.primary,
    width: "48%",
    padding: spacing.padding.md,
    borderRadius: spacing.borderRadius.lg,
    alignItems: "center",
    marginBottom: spacing.padding.md,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  categoryTitle: {
    ...typography.textStyles.cardTitle,
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  categorySubtitle: {
    ...typography.textStyles.cardSubtitle,
    color: colors.text.primary,
    textAlign: "center",
  },
});
