import { useCartItems } from './useCartItems'
import { useCartApi } from './useCartApi'
import { useCartTotals } from './useCartTotals'
import { useCheckout } from './useCheckout'

export function useCart(apiBaseUrl = '/api/cart') {
  const cartItems = useCartItems()
  const cartApi = useCartApi(apiBaseUrl)
  const cartTotals = useCartTotals(cartItems.items)
  const checkout = useCheckout(cartApi, cartItems, cartTotals)

  async function loadCart() {
    const data = await cartApi.fetchCart()
    cartItems.setItems(data.items)
    if (data.discountCode) {
      cartTotals.applyDiscount(data.discountCode)
    }
    if (data.taxRate != null) {
      cartTotals.setTaxRate(data.taxRate)
    }
  }

  async function addItem(product, quantity = 1) {
    cartItems.addItem(product, quantity)
    await cartApi.addItemToServer(product.id, quantity)
  }

  async function removeItem(productId) {
    cartItems.removeItem(productId)
    await cartApi.removeItemFromServer(productId)
  }

  return {
    // Items
    items: cartItems.items,
    itemCount: cartItems.itemCount,
    isEmpty: cartItems.isEmpty,
    updateQuantity: cartItems.updateQuantity,
    clearCart: cartItems.clearCart,

    // API
    loading: cartApi.loading,
    error: cartApi.error,

    // Totals
    subtotal: cartTotals.subtotal,
    discountCode: cartTotals.discountCode,
    discountAmount: cartTotals.discountAmount,
    taxAmount: cartTotals.taxAmount,
    total: cartTotals.total,
    applyDiscount: cartTotals.applyDiscount,
    removeDiscount: cartTotals.removeDiscount,
    setTaxRate: cartTotals.setTaxRate,

    // Checkout
    checkoutStep: checkout.step,
    orderId: checkout.orderId,
    processing: checkout.processing,
    checkoutError: checkout.checkoutError,
    customerDetails: checkout.customerDetails,
    paymentDetails: checkout.paymentDetails,
    processCheckout: checkout.processCheckout,
    resetCheckout: checkout.resetCheckout,

    // Combined operations
    loadCart,
    addItem,
    removeItem,
  }
}
