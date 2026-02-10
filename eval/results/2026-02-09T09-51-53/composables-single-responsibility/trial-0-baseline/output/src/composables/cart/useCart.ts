import { useCartItems } from './useCartItems';
import { useCartApi } from './useCartApi';
import { useCartTotals } from './useCartTotals';
import { useCheckout } from './useCheckout';

export function useCart(options: { apiBaseUrl?: string } = {}) {
  const { apiBaseUrl } = options;

  const {
    items,
    itemCount,
    isEmpty,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setItems,
  } = useCartItems();

  const api = useCartApi(apiBaseUrl);

  const {
    discount,
    taxRate,
    subtotal,
    discountAmount,
    tax,
    total,
    totals,
    applyDiscount,
    removeDiscount,
  } = useCartTotals(items);

  const checkout = useCheckout(items, totals, discount, {
    onSuccess: clearCart,
  });

  async function loadCart() {
    const data = await api.fetchCart();
    setItems(data.items);
    if (data.discount) {
      applyDiscount(data.discount);
    }
  }

  async function syncCart() {
    await api.saveCart(items.value);
  }

  return {
    // Items
    items,
    itemCount,
    isEmpty,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,

    // API
    loadCart,
    syncCart,
    apiLoading: api.loading,
    apiError: api.error,

    // Totals
    discount,
    taxRate,
    subtotal,
    discountAmount,
    tax,
    total,
    totals,
    applyDiscount,
    removeDiscount,

    // Checkout
    checkout,
  };
}
