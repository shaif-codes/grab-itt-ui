import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, typography, spacing } from "@constants";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";
import { BUTTONS } from "@constants/button";

interface ProductActionsProps {
  productId: string;
  inStock: boolean;
  onAddToCart: (productId: string, quantity: number) => void;
  onBuyNow: (productId: string, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  isInWishlist?: boolean;
}

export default function ProductActions({
  productId,
  inStock,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isInWishlist = false,
}: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(productId, quantity);
  };

  const handleBuyNow = () => {
    onBuyNow(productId, quantity);
  };

  const handleWishlistToggle = () => {
    onToggleWishlist(productId);
  };

  return (
    <View style={styles.container}>
      {/* Quantity Selector */}
      <View style={styles.quantitySection}>
        {/* Wishlist Button */}
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={handleWishlistToggle}
        >
          <Ionicons
            name={isInWishlist ? "heart" : "heart-outline"}
            size={17}
            color={isInWishlist ? colors.error : colors.text.secondary}
          />
        </TouchableOpacity>
        <View style={styles.quantitySection}>
          <Text style={styles.quantityLabel}>Quantity:</Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity
              style={[
                styles.quantityButton,
                quantity <= 1 && styles.disabledButton,
              ]}
              onPress={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              <Ionicons
                name="remove"
                size={20}
                color={quantity <= 1 ? colors.gray[400] : colors.text.primary}
              />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={[
                styles.quantityButton,
                quantity >= 10 && styles.disabledButton,
              ]}
              onPress={() => handleQuantityChange(1)}
              disabled={quantity >= 10}
            >
              <Ionicons
                name="add"
                size={20}
                color={quantity >= 10 ? colors.gray[400] : colors.text.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        {/* Add to Cart Button */}
        {/* <View style={styles.cartButtonContainer}> */}
          <Button
            title="Add to Cart"
            onPress={handleAddToCart}
            type={BUTTONS.SECONDARY}
            disabled={!inStock}
            extraButtonStyle={styles.cartButton}
            extraTextStyle={styles.cartButtonText}
          />
        {/* </View> */}

        {/* Buy Now Button */}
        {/* <View style={styles.buyButtonContainer}> */}
          <Button
            title="Buy Now"
            onPress={handleBuyNow}
            type={BUTTONS.PRIMARY}
            disabled={!inStock}
            extraButtonStyle={styles.buyButton}
            extraTextStyle={styles.buyButtonText}
          />
        {/* </View> */}
      </View>

      {/* Stock Warning */}
      {!inStock && (
        <View style={styles.stockWarning}>
          <Ionicons name="warning" size={16} color={colors.error} />
          <Text style={styles.stockWarningText}>
            This product is currently out of stock
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    paddingHorizontal: spacing.padding.md,
    paddingVertical: spacing.padding.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.primary,
  },
  quantitySection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.padding.md,
  },
  quantityLabel: {
    ...typography.textStyles.body,
    color: colors.text.primary,
    fontWeight: "600",
    marginRight: spacing.padding.sm,
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.borderRadius.md,
    paddingHorizontal: spacing.padding.sm,
  },
  quantityButton: {
    padding: spacing.padding.sm,
    borderRadius: spacing.borderRadius.sm,
  },
  disabledButton: {
    opacity: 0.5,
  },
  quantityText: {
    ...typography.textStyles.body,
    color: colors.text.primary,
    fontWeight: "600",
    paddingHorizontal: spacing.padding.md,
    minWidth: 30,
    textAlign: "center",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.padding.sm,
  },
  wishlistButton: {
    padding: spacing.padding.sm,
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.padding.lg,
  },
  cartButtonContainer: {
    flex: 1,
  },
  cartButton: {
    paddingVertical: spacing.padding.md,
    width: "70%",
  },
  cartButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: "600",
    // width: "40%",
  },
  buyButtonContainer: {
    flex: 1,
  },
  buyButton: {
    paddingVertical: spacing.padding.md,
    width: "70%",
    backgroundColor: colors.button.secondary,
    borderColor: colors.button.secondary,
  },
  buyButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: "600",
    // width: "40%",
  },
  stockWarning: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.padding.sm,
    paddingVertical: spacing.padding.sm,
    backgroundColor: colors.error + "10",
    borderRadius: spacing.borderRadius.sm,
    gap: spacing.xs,
  },
  stockWarningText: {
    ...typography.textStyles.caption,
    color: colors.error,
    fontWeight: "500",
  },
});
