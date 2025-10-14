import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { colors, spacing, typography } from "@constants";
import { TagType } from "@/types/tags";
interface TagProps {
  text: string;
  type: TagType;
  extraStyle?: StyleProp<ViewStyle>;
}

export default function Tag({ text, type, extraStyle }: TagProps) {
  return (
    <View style={[styles.tag, { backgroundColor: colors.tag[type as keyof typeof colors.tag].background }, extraStyle]}>
      <Text style={[styles.tagText, { color: colors.tag[type as keyof typeof colors.tag].text }]}>{text}</Text>
    </View>
  );
}



const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: spacing.padding.sm,
    paddingVertical: spacing.padding.xs,
    borderRadius: spacing.borderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: spacing.xs,
  },
  tagText: {
    ...typography.textStyles.caption,
    fontWeight: "600",
  },
});