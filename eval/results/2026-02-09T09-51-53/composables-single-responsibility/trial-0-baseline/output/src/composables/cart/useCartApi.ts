import { ref } from 'vue';
import type { CartApiResponse, CartItem } from './types';

export function useCartApi(baseUrl = '/api/cart') {
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchCart(): Promise<CartApiResponse> {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(baseUrl);
      if (!res.ok) throw new Error(`Failed to fetch cart: ${res.status}`);
      return await res.json();
    } catch (e) {
      error.value = (e as Error).message;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function saveCart(items: CartItem[]): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(baseUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      if (!res.ok) throw new Error(`Failed to save cart: ${res.status}`);
    } catch (e) {
      error.value = (e as Error).message;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function addItemToServer(item: CartItem): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(`${baseUrl}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (!res.ok) throw new Error(`Failed to add item: ${res.status}`);
    } catch (e) {
      error.value = (e as Error).message;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function removeItemFromServer(productId: string): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(`${baseUrl}/items/${productId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error(`Failed to remove item: ${res.status}`);
    } catch (e) {
      error.value = (e as Error).message;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    error,
    fetchCart,
    saveCart,
    addItemToServer,
    removeItemFromServer,
  };
}
