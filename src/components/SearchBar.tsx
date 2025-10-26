import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { colors, typography, spacing } from "@constants";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  onSearchPress?: () => void;
  navigation?: any;
}

export default function SearchBar({ onSearchPress, navigation }: SearchBarProps) {
  const handlePress = () => {
    if (onSearchPress) {
      onSearchPress();
    } else if (navigation) {
      navigation.navigate('ProductList', {});
    }
  };

  return (
    <TouchableOpacity style={styles.searchContainer} onPress={handlePress}>
      <Ionicons name="search" size={20} color={colors.search.placeholder} />
      <Text style={styles.searchInputPlaceholder}>Search Har Jarurat...</Text>
    </TouchableOpacity>
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
  searchInputPlaceholder: {
    ...typography.textStyles.searchPlaceholder,
    color: colors.search.placeholder,
    marginLeft: spacing.sm,
    flex: 1,
  },
});
