import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { colors, typography, spacing } from '@constants';
import { Ionicons } from '@expo/vector-icons';
import Header from '@components/Header';
import Button from '@components/Button';
import { BUTTONS } from '@constants/button';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { ProductListScreenNavigationProp } from '../types/navigation';

interface CartScreenProps {
  navigation: ProductListScreenNavigationProp;
}

export default function CartScreen({ navigation }: CartScreenProps) {
  const cart = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    } else {
      handleRemoveItem(id);
    }
  };

  const handleRemoveItem = (id: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => dispatch(removeFromCart(id))
        }
      ]
    );
  };

  const handleCheckout = () => {
    if (cart.items.length === 0) {
      Alert.alert('Cart is Empty', 'Please add items to your cart first.');
      return;
    }
    
    Alert.alert(
      'Proceed to Checkout',
      `Total Amount: ₹${cart.total.toFixed(2)}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Checkout', 
          onPress: () => {
            // TODO: Navigate to checkout screen
            Alert.alert('Checkout', 'Checkout functionality coming soon!');
          }
        }
      ]
    );
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to clear all items from cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => dispatch(clearCart())
        }
      ]
    );
  };

  if (cart.items.length === 0) {
    return (
      <View style={styles.container}>
        <Header 
          headerHeading="My Cart" 
          onlyBadges={true}
          showBackBtn={true}
          onBackPress={() => navigation.goBack()}
        />
        
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color={colors.text.secondary} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add items to get started</Text>
          
          <Button
            title="Continue Shopping"
            onPress={() => navigation.navigate('ProductList', {})}
            type={BUTTONS.PRIMARY}
            extraButtonStyle={styles.shopButton}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header 
        headerHeading="My Cart" 
        onlyBadges={false}
        showBackBtn={true}
        onBackPress={() => navigation.goBack()}
      />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.itemsContainer}>
          {cart.items.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                
                <View style={styles.priceRow}>
                  <Text style={styles.itemPrice}>₹{item.price}</Text>
                  {item.originalPrice && (
                    <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
                  )}
                </View>
                
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  >
                    <Ionicons name="remove" size={20} color={colors.text.primary} />
                  </TouchableOpacity>
                  
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    <Ionicons name="add" size={20} color={colors.text.primary} />
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.itemActions}>
                <Text style={styles.subtotal}>₹{(item.price * item.quantity).toFixed(2)}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveItem(item.id)}
                >
                  <Ionicons name="trash-outline" size={20} color={colors.error} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>₹{cart.total.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Charges</Text>
            <Text style={styles.summaryValue}>₹50.00</Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹{(cart.total + 50).toFixed(2)}</Text>
          </View>
        </View>
        
        {cart.items.length > 0 && (
          <TouchableOpacity onPress={handleClearCart} style={styles.clearButton}>
            <Ionicons name="trash-outline" size={16} color={colors.error} />
            <Text style={styles.clearButtonText}>Clear Cart</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      
      <View style={styles.checkoutContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ₹{(cart.total + 50).toFixed(2)}</Text>
          <Text style={styles.itemsCount}>{cart.itemCount} item(s)</Text>
        </View>
        
        <Button
          title="Proceed to Checkout"
          onPress={handleCheckout}
          type={BUTTONS.PRIMARY}
          extraButtonStyle={styles.checkoutButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingTop: spacing.padding.lg,
  },
  scrollView: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.padding.xl,
  },
  emptyTitle: {
    ...typography.textStyles.h2,
    color: colors.text.primary,
    marginTop: spacing.padding.lg,
    marginBottom: spacing.padding.sm,
  },
  emptySubtitle: {
    ...typography.textStyles.body,
    color: colors.text.secondary,
    marginBottom: spacing.padding.xl,
    textAlign: 'center',
  },
  shopButton: {
    width: '100%',
    marginTop: spacing.padding.md,
  },
  itemsContainer: {
    paddingHorizontal: spacing.padding.md,
    paddingTop: spacing.padding.md,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.padding.md,
    marginBottom: spacing.padding.md,
    elevation: 2,
    shadowColor: colors.shadow.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: spacing.borderRadius.md,
    marginRight: spacing.padding.md,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    ...typography.textStyles.cardTitle,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  itemPrice: {
    ...typography.textStyles.body,
    color: colors.primary,
    fontWeight: '700',
  },
  originalPrice: {
    ...typography.textStyles.caption,
    color: colors.text.secondary,
    textDecorationLine: 'line-through',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    borderRadius: spacing.borderRadius.md,
    paddingHorizontal: spacing.padding.sm,
    paddingVertical: spacing.padding.xs,
    marginTop: spacing.sm,
  },
  quantityButton: {
    padding: spacing.padding.xs,
  },
  quantityText: {
    ...typography.textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginHorizontal: spacing.padding.md,
    minWidth: 30,
    textAlign: 'center',
  },
  itemActions: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtotal: {
    ...typography.textStyles.h3,
    color: colors.text.primary,
    fontWeight: '700',
    marginBottom: spacing.padding.sm,
  },
  removeButton: {
    padding: spacing.padding.sm,
  },
  summaryContainer: {
    backgroundColor: colors.background.secondary,
    marginHorizontal: spacing.padding.md,
    marginTop: spacing.padding.lg,
    padding: spacing.padding.md,
    borderRadius: spacing.borderRadius.lg,
    marginBottom: spacing.padding.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.padding.sm,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border.primary,
    paddingTop: spacing.padding.md,
    marginTop: spacing.padding.sm,
  },
  summaryLabel: {
    ...typography.textStyles.body,
    color: colors.text.primary,
  },
  summaryValue: {
    ...typography.textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  totalLabel: {
    ...typography.textStyles.h3,
    color: colors.text.primary,
  },
  totalValue: {
    ...typography.textStyles.h3,
    color: colors.primary,
    fontWeight: '700',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.padding.md,
    marginBottom: spacing.padding.md,
    padding: spacing.padding.md,
    gap: spacing.sm,
  },
  clearButtonText: {
    ...typography.textStyles.body,
    color: colors.error,
    fontWeight: '600',
  },
  checkoutContainer: {
    backgroundColor: colors.background.secondary,
    padding: spacing.padding.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.primary,
    gap: spacing.padding.md,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.padding.sm,
  },
  totalText: {
    ...typography.textStyles.h3,
    color: colors.text.primary,
    fontWeight: '700',
  },
  itemsCount: {
    ...typography.textStyles.body,
    color: colors.text.secondary,
  },
  checkoutButton: {
    width: '100%',
  },
});

