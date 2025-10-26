import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { colors, typography, spacing } from "@constants";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "../store/hooks";

interface HeaderProps {
  showBadges?: boolean;
  onlyBadges?: boolean;
  headerHeading?: string;
  showBackBtn?: boolean;
  onBackPress?: () => void;
  onCartPress?: () => void;
  onNotificationPress?: () => void;
}

export default function Header({ showBadges = true, onlyBadges = false, headerHeading = "" , showBackBtn = false, onBackPress, onCartPress, onNotificationPress}: HeaderProps) {
  const cartCount = useAppSelector(state => state.cart.itemCount);
  const unreadCount = useAppSelector(state => 
    state.notifications.notifications.filter(n => !n.read).length
  );
  
  return (
      <View style={styles.header}>
        {showBackBtn ? (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        ) : !onlyBadges && (
          <View style={styles.logoContainer}>
          <Image
            source={require("@assets/images/logo.png")}
            style={styles.logoCircle}
          />
          <View style={styles.brandContainer}>
            <Text style={styles.brandName}>GRABB ITT</Text>
            <Text style={styles.tagline}>Har Jarurat Har Ghar</Text>
            </View>
          </View>
        )}
        {headerHeading && (
          <Text style={styles.headerTitle}>{headerHeading}</Text>
        )}
        {showBadges && (
          <View style={styles.badgeContainer}>
          <TouchableOpacity style={styles.badge} onPress={onCartPress}>
            <Ionicons name="cart-outline" size={20} color={colors.text.primary} />
            {cartCount > 0 && <Text style={styles.badgeText}>{cartCount}</Text>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.badge} onPress={onNotificationPress}>
            <Ionicons name="notifications-outline" size={20} color={colors.text.primary} />
            {unreadCount > 0 && <Text style={styles.badgeText}>{unreadCount}</Text>}
          </TouchableOpacity>
          </View>
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  // Header styles
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.padding.md,
    paddingTop: spacing.padding.lg,
    paddingBottom: spacing.padding.md,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoCircle: {
    width: spacing.logo.lg,
    height: spacing.logo.lg,
    marginRight: spacing.sm,
  },
  brandContainer: {
    flexDirection: "column",
  },
  brandName: {
    ...typography.textStyles.brand,
    color: colors.text.primary,
  },
  tagline: {
    ...typography.textStyles.tagline,
    color: colors.text.primary,
  },
  badgeContainer: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  badge: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
  },
  badgeText: {
    ...typography.textStyles.badge,
    color: colors.white,
    fontWeight: "600",
    position: "absolute",
    top: -6,
    right: -6,
    zIndex: 1,
    minWidth: 16,
    height: 16,
    lineHeight: 16,
    borderRadius: 8,
    backgroundColor: colors.badge.red,
    textAlign: "center",
  },
  headerTitle: {
    ...typography.textStyles.h1,
    color: colors.text.primary,
  },
  backButton: {
    padding: spacing.padding.sm,
    marginRight: spacing.padding.xs,
  },
});
