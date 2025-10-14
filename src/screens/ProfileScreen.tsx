import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { colors, typography, spacing } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import Header from "@components/Header";
import MenuItem from "@/components/MenuItem";
import Button from "@/components/Button";
import { BUTTONS } from "@/constants/button";

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Header showBadges={false} />

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImage}>
            <Ionicons name="person" size={32} color={colors.text.tertiary} />
          </View>
        </View>
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileEmail}>john.doe@example.com</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <MenuItem icon="person-outline" title="Personal Information" />
        <MenuItem icon="location-outline" title="Delivery Address" />
        <MenuItem icon="card-outline" title="Payment Methods" />
        <MenuItem icon="notifications-outline" title="Notifications" />
        <MenuItem icon="help-circle-outline" title="Help & Support" />
        <MenuItem icon="information-circle-outline" title="About" />
      </View>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <Button
          title="Logout"
          type={BUTTONS.ERROR}
          onPress={() => { }}
          extraButtonStyle={styles.logoutButton}
          extraTextStyle={styles.logoutText}
          icon="log-out-outline"
          iconSize={spacing.icon.md}
          iconColor={colors.text.error}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingTop: spacing.padding.lg,
  },

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
    width: spacing.logo.md,
    height: spacing.logo.md,
    borderRadius: spacing.logo.md / 2,
    backgroundColor: colors.primary,
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

  // Profile section styles
  profileSection: {
    alignItems: "center",
    paddingVertical: spacing.padding.xl,
    paddingHorizontal: spacing.padding.md,
  },
  profileImageContainer: {
    marginBottom: spacing.padding.md,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.background.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.primary,
  },
  profileName: {
    ...typography.textStyles.h2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  profileEmail: {
    ...typography.textStyles.body,
    color: colors.text.secondary,
  },

  // Menu styles
  menuContainer: {
    paddingHorizontal: spacing.padding.md,
    marginBottom: spacing.padding.xl,
  },

  logoutContainer: {
    paddingHorizontal: spacing.padding.md,
  },

  logoutButton: {
    width: "100%",
    borderRadius: spacing.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border.error,
    paddingVertical: spacing.padding.md,
    paddingHorizontal: spacing.padding.lg,
  },
  logoutText: {
    ...typography.textStyles.button,
    color: colors.text.error,
  },
});
