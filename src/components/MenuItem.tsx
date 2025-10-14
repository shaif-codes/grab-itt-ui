import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IconName } from "@/types/icon";

interface MenuItemProps {
  icon: IconName;
  title: string;
}

export default function MenuItem({ icon, title }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <View style={styles.menuIcon}>
              <Ionicons name={icon} size={20} color={colors.primaryExtraDark} />
            </View>
            <Text style={styles.menuText}>{title}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.padding.md,
        paddingHorizontal: spacing.padding.sm,
        borderRadius: spacing.borderRadius.md,
        marginBottom: spacing.xs,
      },
      menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
      },
      menuIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.background.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.padding.md,
      },
      menuText: {
        ...typography.textStyles.body,
        color: colors.text.primary,
        flex: 1,
      }
});