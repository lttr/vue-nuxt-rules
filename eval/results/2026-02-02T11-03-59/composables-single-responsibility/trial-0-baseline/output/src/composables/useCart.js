import { useCartItems } from './useCartItems'
import { useCartApi } from './useCartApi'
import { useCartTotals } from './useCartTotals'
import { useCheckout } from './useCheckout'

export function useCart({ apiBaseUrl = '/api/cart', checkoutBaseUrl = '/api/checkout' } = {}) {
  const {
    items,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setItems,
  } = useCartItems()

  const api = useCartApi(apiBaseUrl)
  const totals = useCartTotals(items)
  const checkout = useCheckout(checkoutBaseUrl)

  async function loadCart() {
    const data = await api.fetchCart()
    setItems(data.items)
    if (data.coupon) totals.setCoupon(data.coupon)
    if (data.taxRate != null) totals.setTaxRate(data.taxRate)
    return data
  }

  async function addAndSync(product, quantity = 1) {
    addItem(product, quantity)
    await api.addItemToServer(product.id, quantity)
  }

  async function removeAndSync(productId) {
    removeItem(productId)
    await api.removeItemFromServer(productId)
  }

  async function applyCoupon(code) {
    const data = await api.applyCoupon(code)
    totals.setCoupon(data.coupon)
    return data
  }

  async function removeCoupon() {
    await api.removeCoupon()
    totals.clearCoupon()
  }

  async function processCheckout(shipping, payment) {
    const result = await checkout.processCheckout({
      items: items.value,
      totals: {
        subtotal: totals.subtotal.value,
        discount: totals.discount.value,
        tax: totals.tax.value,
        total: totals.total.value,
        couponCode: totals.coupon.value?.code ?? null,
      },
      shipping,
      payment,
    })
    clearCart()
    totals.clearCoupon()
    return result
  }

  return {
    // Cart items
    items,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,

    // API-synced operations
    loadCart,
    addAndSync,
    removeAndSync,

    // Totals & discounts
    subtotal: totals.subtotal,
    discount: totals.discount,
    tax: totals.tax,
    total: totals.total,
    coupon: totals.coupon,
    taxRate: totals.taxRate,
    setTaxRate: totals.setTaxRate,
    applyCoupon,
    removeCoupon,

    // Checkout
    checkoutState: checkout.checkoutState,
    checkoutLoading: checkout.loading,
    checkoutError: checkout.error,
    order: checkout.order,
    setCheckoutStep: checkout.setStep,
    processCheckout,
    resetCheckout: checkout.reset,

    // API state
    apiLoading: api.loading,
    apiError: api.error,
  }
}
