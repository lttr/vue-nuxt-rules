import { ref } from 'vue'
import { useCartItems } from './useCartItems'
import { useCartApi } from './useCartApi'
import { useCartTotals } from './useCartTotals'
import { useCheckout } from './useCheckout'

export function useCart(apiBaseUrl = '/api') {
  const {
    items,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setItems,
  } = useCartItems()

  const {
    loading,
    error: apiError,
    fetchCart,
    saveCart,
    addItemToServer,
    removeItemFromServer,
    updateItemOnServer,
  } = useCartApi(`${apiBaseUrl}/cart`)

  const discountCode = ref(null)

  const {
    subtotal,
    discount,
    tax,
    total,
    isValidDiscount,
  } = useCartTotals(items, discountCode)

  const {
    processing,
    error: checkoutError,
    order,
    checkoutState,
    setShippingInfo,
    setPaymentInfo,
    goToStep,
    processCheckout,
    resetCheckout,
  } = useCheckout(`${apiBaseUrl}/checkout`)

  async function loadCart() {
    const data = await fetchCart()
    setItems(data.items || [])
    if (data.discountCode) {
      discountCode.value = data.discountCode
    }
  }

  async function addToCart(product, quantity = 1) {
    addItem(product, quantity)
    try {
      await addItemToServer(product, quantity)
    } catch {
      removeItem(product.id)
    }
  }

  async function removeFromCart(productId) {
    const backup = [...items.value]
    removeItem(productId)
    try {
      await removeItemFromServer(productId)
    } catch {
      setItems(backup)
    }
  }

  async function updateCartQuantity(productId, quantity) {
    const item = items.value.find((i) => i.id === productId)
    const previousQty = item?.quantity
    updateQuantity(productId, quantity)
    try {
      await updateItemOnServer(productId, quantity)
    } catch {
      if (previousQty != null) {
        updateQuantity(productId, previousQty)
      }
    }
  }

  function applyDiscount(code) {
    if (isValidDiscount(code)) {
      discountCode.value = code
      return true
    }
    return false
  }

  function removeDiscount() {
    discountCode.value = null
  }

  async function checkout() {
    const result = await processCheckout({
      items: items.value,
      totals: {
        subtotal: subtotal.value,
        discount: discount.value,
        tax: tax.value,
        total: total.value,
      },
      discountCode: discountCode.value,
    })
    clearCart()
    discountCode.value = null
    return result
  }

  return {
    // State
    items,
    itemCount,
    loading,
    apiError,
    discountCode,

    // Totals
    subtotal,
    discount,
    tax,
    total,

    // Cart actions
    loadCart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,

    // Discount
    applyDiscount,
    removeDiscount,
    isValidDiscount,

    // Checkout
    processing,
    checkoutError,
    order,
    checkoutState,
    setShippingInfo,
    setPaymentInfo,
    goToStep,
    checkout,
    resetCheckout,
  }
}
