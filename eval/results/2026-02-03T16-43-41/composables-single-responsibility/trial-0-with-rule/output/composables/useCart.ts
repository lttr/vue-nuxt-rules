import { watch } from 'vue'
import { useCartItems, type CartItem } from './useCartItems'
import { useFetchCart, type FetchCartOptions } from './useFetchCart'
import { useCartTotals, type Discount, type UseCartTotalsOptions } from './useCartTotals'
import {
  useCheckout,
  type UseCheckoutOptions,
  type ShippingAddress,
  type PaymentInfo,
} from './useCheckout'

export interface UseCartOptions {
  fetchOptions?: FetchCartOptions
  totalsOptions?: UseCartTotalsOptions
  checkoutOptions?: UseCheckoutOptions
  autoSave?: boolean
  autoLoad?: boolean
}

export function useCart(options: UseCartOptions = {}) {
  const {
    fetchOptions,
    totalsOptions,
    checkoutOptions,
    autoSave = false,
    autoLoad = false,
  } = options

  const cartItems = useCartItems()
  const fetchCart = useFetchCart(fetchOptions)
  const cartTotals = useCartTotals(cartItems.items, totalsOptions)
  const checkout = useCheckout(checkoutOptions)

  async function loadCart(): Promise<void> {
    const items = await fetchCart.fetchCart()
    cartItems.clearCart()
    items.forEach(item => {
      const { quantity, ...rest } = item
      cartItems.addItem(rest, quantity)
    })
  }

  async function saveCartToServer(): Promise<void> {
    await fetchCart.saveCart(cartItems.items.value)
  }

  async function processCheckout(
    shippingAddress: ShippingAddress,
    paymentInfo: PaymentInfo
  ) {
    return checkout.processCheckout({
      items: cartItems.items.value,
      shippingAddress,
      paymentInfo,
      discount: cartTotals.discount.value,
      subtotal: cartTotals.subtotal.value,
      discountAmount: cartTotals.discountAmount.value,
      tax: cartTotals.tax.value,
      total: cartTotals.total.value,
    })
  }

  if (autoSave) {
    watch(
      cartItems.items,
      () => {
        saveCartToServer()
      },
      { deep: true }
    )
  }

  if (autoLoad) {
    loadCart()
  }

  return {
    // Cart items
    items: cartItems.items,
    itemCount: cartItems.itemCount,
    addItem: cartItems.addItem,
    removeItem: cartItems.removeItem,
    updateQuantity: cartItems.updateQuantity,
    clearCart: cartItems.clearCart,
    getItem: cartItems.getItem,

    // Fetching
    isLoading: fetchCart.isLoading,
    fetchError: fetchCart.error,
    loadCart,
    saveCart: saveCartToServer,

    // Totals
    subtotal: cartTotals.subtotal,
    discount: cartTotals.discount,
    discountAmount: cartTotals.discountAmount,
    tax: cartTotals.tax,
    total: cartTotals.total,
    applyDiscount: cartTotals.applyDiscount,
    removeDiscount: cartTotals.removeDiscount,

    // Checkout
    isProcessing: checkout.isProcessing,
    checkoutError: checkout.error,
    lastOrder: checkout.lastOrder,
    processCheckout,
    validateCheckout: checkout.validateCheckout,
  }
}

export type {
  CartItem,
  Discount,
  ShippingAddress,
  PaymentInfo,
}
