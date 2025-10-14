import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors, typography, spacing } from "../constants";
import { Header, OrderCard, OrderEmptyState } from "@components/index";
import { OrderStatus } from "@/types/order";

export default function OrdersScreen() {
  const orders = [
    {
      orderId: "12345",
      orderStatus: "Delivered",
      orderDate: "Dec 15, 2024" as string,
      orderTotal: "299" as string
    },
    {
      orderId: "12346",
      orderStatus: "Pending",
      orderDate: "Dec 16, 2024" as string,
      orderTotal: "399" as string,
    },
    {
      orderId: "12347",
      orderStatus: "Cancelled",
      orderDate: "Dec 17, 2024" as string,
      orderTotal: "499" as string,
    },
  ];
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Header showBadges={false} />

      {/* Page Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.pageTitle}>My Orders</Text>
        <Text style={styles.pageSubtitle}>
          Track your orders and view order history
        </Text>
      </View>

      {/* Empty State */}
      {orders.length === 0 ? (
        <OrderEmptyState />
      ) : (
        orders.map((order) => (
          <OrderCard
            key={order.orderId}
            orderId={order.orderId}
            orderStatus={order.orderStatus as OrderStatus}
            orderDate={order.orderDate}
            orderTotal={order.orderTotal}
          />
        ))
      )}
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

  // Title styles
  titleContainer: {
    paddingHorizontal: spacing.padding.md,
    paddingBottom: spacing.padding.lg,
  },
  pageTitle: {
    ...typography.textStyles.h2,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  pageSubtitle: {
    ...typography.textStyles.body,
    color: colors.text.secondary,
  },

  // Empty state styles
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.padding.lg,
    paddingVertical: spacing.padding.xl,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.background.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.padding.lg,
  },
  emptyTitle: {
    ...typography.textStyles.h3,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  emptySubtitle: {
    ...typography.textStyles.body,
    color: colors.text.secondary,
    textAlign: "center",
    lineHeight: 24,
  },
});
