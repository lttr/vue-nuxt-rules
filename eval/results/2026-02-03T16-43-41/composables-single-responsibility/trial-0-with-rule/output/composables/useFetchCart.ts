import { ref, type Ref } from 'vue'
import type { CartItem } from './useCartItems'

export interface FetchCartOptions {
  baseUrl?: string
  onError?: (error: Error) => void
}

export interface UseFetchCartReturn {
  isLoading: Ref<boolean>
  error: Ref<Error | null>
  fetchCart: () => Promise<CartItem[]>
  saveCart: (items: CartItem[]) => Promise<void>
}

export function useFetchCart(options: FetchCartOptions = {}): UseFetchCartReturn {
  const { baseUrl = '/api/cart', onError } = options

  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  async function fetchCart(): Promise<CartItem[]> {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(baseUrl)

      if (!response.ok) {
        throw new Error(`Failed to fetch cart: ${response.statusText}`)
      }

      const data = await response.json()
      return data.items as CartItem[]
    } catch (e) {
      const err = e instanceof Error ? e : new Error('Unknown error')
      error.value = err
      onError?.(err)
      return []
    } finally {
      isLoading.value = false
    }
  }

  async function saveCart(items: CartItem[]): Promise<void> {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(baseUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })

      if (!response.ok) {
        throw new Error(`Failed to save cart: ${response.statusText}`)
      }
    } catch (e) {
      const err = e instanceof Error ? e : new Error('Unknown error')
      error.value = err
      onError?.(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    fetchCart,
    saveCart,
  }
}
