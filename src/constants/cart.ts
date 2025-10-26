export const CART_MESSAGES = {
  ADDED_TO_CART(productName: string): {heading: string, message: string} {
    return `Added ${productName} to your cart`;
  },
  ADDED_TO_CART_QUANTITY(quantity: number, productName: string): {heading: string, message: string} {
    return {heading: 'Added to Cart', message: `Added ${quantity} ${productName} to your cart`};
  },
  REMOVED_FROM_CART(productName: string): {heading: string, message: string} {
    return {heading: 'Removed from Cart', message: `Removed ${productName} from your cart`};
  },
  REMOVED_FROM_CART_QUANTITY(quantity: number, productName: string): {heading: string, message: string} {
    return {heading: 'Removed from Cart', message: `Removed ${quantity} ${productName} from your cart`};
  },
  CLEAR_CART: {heading: 'Cart Cleared', message: 'All items removed from cart'},
};