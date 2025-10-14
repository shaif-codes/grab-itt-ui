import { View, Text, StyleSheet, TextInput } from "react-native";
import { colors, typography, spacing } from "@constants";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar() {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color={colors.search.placeholder} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search Har Jarurat..."
        placeholderTextColor={colors.search.placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.search.background,
    marginHorizontal: spacing.padding.md,
    paddingHorizontal: spacing.padding.md,
    paddingVertical: spacing.padding.sm,
    borderRadius: spacing.borderRadius.lg,
    marginBottom: spacing.padding.md,
  },
  searchInput: {
    ...typography.textStyles.searchPlaceholder,
    color: colors.search.text,
    marginLeft: spacing.sm,
    flex: 1,
  },
});
