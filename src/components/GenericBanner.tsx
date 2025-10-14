import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { colors, typography, spacing } from "@constants";

interface GenericBannerProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonAction?: () => void;
  bannerImagePath?: ImageSourcePropType;
  onlyImage?: boolean;
}

export default function GenericBanner({
  title,
  subtitle,
  buttonText,
  buttonAction,
  bannerImagePath,
  onlyImage = false,
}: GenericBannerProps) {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerTitle}>{title}</Text>
      {bannerImagePath && (
        <Image source={bannerImagePath} style={styles.bannerImage} />
      )}
      {!onlyImage && <Text style={styles.bannerSubtitle}>{subtitle}</Text>}
      {buttonText && (
        <TouchableOpacity style={styles.actionButton} onPress={buttonAction}>
          <Text style={styles.actionButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.primary,
    marginHorizontal: spacing.padding.md,
    padding: spacing.padding.lg,
    borderRadius: spacing.borderRadius.lg,
    marginBottom: spacing.padding.lg,
  },
  bannerImage: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
    borderRadius: spacing.borderRadius.lg,
  },
  bannerTitle: {
    ...typography.textStyles.bannerTitle,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  bannerSubtitle: {
    ...typography.textStyles.bannerSubtitle,
    color: colors.text.primary,
    marginBottom: spacing.padding.md,
  },
  actionButton: {
    backgroundColor: colors.button.primary,
    paddingHorizontal: spacing.padding.md,
    paddingVertical: spacing.padding.sm,
    borderRadius: spacing.borderRadius.md,
    alignSelf: "flex-start",
  },
  actionButtonText: {
    ...typography.textStyles.button,
    color: colors.button.primaryText,
  },
});
