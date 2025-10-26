import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  ActivityIndicator,
} from "react-native";
import { colors, typography, spacing } from "@constants";

interface GenericBannerProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonAction?: () => void;
  bannerImagePath?: ImageSourcePropType;
  imageUrl?: string;
  onlyImage?: boolean;
}

export default function GenericBanner({
  title,
  subtitle,
  buttonText,
  buttonAction,
  bannerImagePath,
  imageUrl,
  onlyImage = false,
}: GenericBannerProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <View style={styles.banner}>
      <Text style={styles.bannerTitle}>{title}</Text>
      {(bannerImagePath || imageUrl) && (
        <View style={styles.imageContainer}>
          {imageLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          )}
          {!imageError && imageUrl ? (
            <Image 
              source={{ uri: imageUrl }} 
              style={styles.bannerImage}
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
            />
          ) : bannerImagePath ? (
            <Image 
              source={bannerImagePath} 
              style={styles.bannerImage}
            />
          ) : null}
        </View>
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
  imageContainer: {
    width: "100%",
    height: 400,
    borderRadius: spacing.borderRadius.lg,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
    borderRadius: spacing.borderRadius.lg,
  },
  loadingContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.gray[100],
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
