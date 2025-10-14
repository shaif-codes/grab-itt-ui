import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, typography } from "@constants";
import { Ionicons } from "@expo/vector-icons";
import { orderStatus } from "@constants/order";
import Tag from "./tag";
import { getOrderStatusTag, TAGS } from "@constants/tags";
import { OrderStatus } from "@/types/order";

interface OrderCardProps {
  orderId: string;
  orderStatus: OrderStatus;
  orderDate: string;
  orderTotal: string;
}

export default function OrderCard({ orderId, orderStatus, orderDate, orderTotal }: OrderCardProps) {
  const tagType = getOrderStatusTag(orderStatus as OrderStatus);
  return (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Order #{orderId}</Text>
        <Tag text={orderStatus} type={tagType} />
      </View>
      <Text style={styles.orderDate}>Delivered on {orderDate}</Text>
      <Text style={styles.orderTotal}>Total: ₹{orderTotal}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
    // Order card styles (for future use)
  orderCard: {
    backgroundColor: colors.background.primary,
    marginHorizontal: spacing.padding.md,
    padding: spacing.padding.md,
    borderRadius: spacing.borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border.primary,
    marginBottom: spacing.padding.md,
    elevation: spacing.elevation.sm,
    shadowColor: colors.shadow.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  orderId: {
    ...typography.textStyles.cardTitle,
    color: colors.text.primary,
  },
  orderStatus: {
    ...typography.textStyles.captionBold,
    color: colors.success,
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.borderRadius.sm,
  },
  orderDate: {
    ...typography.textStyles.bodySmall,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  orderTotal: {
    ...typography.textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
})
