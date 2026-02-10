import { ref, computed } from 'vue';
import type { CartItem } from './types';

const items = ref<CartItem[]>([]);

export function useCartItems() {
  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  );

  const isEmpty = computed(() => items.value.length === 0);

  function addItem(newItem: Omit<CartItem, 'quantity'>, quantity = 1) {
    const existing = items.value.find((i) => i.productId === newItem.productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.value.push({ ...newItem, quantity });
    }
  }

  function removeItem(productId: string) {
    items.value = items.value.filter((i) => i.productId !== productId);
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    const item = items.value.find((i) => i.productId === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  function clearCart() {
    items.value = [];
  }

  function setItems(newItems: CartItem[]) {
    items.value = newItems;
  }

  return {
    items,
    itemCount,
    isEmpty,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setItems,
  };
}
