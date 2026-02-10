import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import type {
  CartItem,
  CartTotals,
  CheckoutPayload,
  Discount,
  OrderConfirmation,
  ShippingAddress,
} from './types';

type CheckoutStep = 'idle' | 'shipping' | 'payment' | 'review' | 'processing' | 'confirmed' | 'error';

export function useCheckout(
  items: Ref<CartItem[]>,
  totals: Ref<CartTotals>,
  discount: Ref<Discount | null>,
  options: { checkoutUrl?: string; onSuccess?: () => void } = {},
) {
  const { checkoutUrl = '/api/checkout', onSuccess } = options;

  const step = ref<CheckoutStep>('idle');
  const shippingAddress = ref<ShippingAddress | null>(null);
  const paymentMethodId = ref<string | null>(null);
  const order = ref<OrderConfirmation | null>(null);
  const error = ref<string | null>(null);
  const processing = ref(false);

  const canCheckout = computed(
    () => items.value.length > 0 && !processing.value,
  );

  function setShippingAddress(address: ShippingAddress) {
    shippingAddress.value = address;
    step.value = 'payment';
  }

  function setPaymentMethod(id: string) {
    paymentMethodId.value = id;
    step.value = 'review';
  }

  function startCheckout() {
    if (!canCheckout.value) return;
    error.value = null;
    step.value = 'shipping';
  }

  async function submitOrder(): Promise<OrderConfirmation> {
    if (!canCheckout.value) {
      throw new Error('Cart is empty or checkout already in progress');
    }

    processing.value = true;
    step.value = 'processing';
    error.value = null;

    const payload: CheckoutPayload = {
      items: items.value,
      totals: totals.value,
      discount: discount.value,
      shippingAddress: shippingAddress.value ?? undefined,
      paymentMethodId: paymentMethodId.value ?? undefined,
    };

    try {
      const res = await fetch(checkoutUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? `Checkout failed: ${res.status}`);
      }

      const confirmation: OrderConfirmation = await res.json();
      order.value = confirmation;
      step.value = 'confirmed';
      onSuccess?.();
      return confirmation;
    } catch (e) {
      error.value = (e as Error).message;
      step.value = 'error';
      throw e;
    } finally {
      processing.value = false;
    }
  }

  function reset() {
    step.value = 'idle';
    shippingAddress.value = null;
    paymentMethodId.value = null;
    order.value = null;
    error.value = null;
    processing.value = false;
  }

  return {
    step,
    shippingAddress,
    paymentMethodId,
    order,
    error,
    processing,
    canCheckout,
    startCheckout,
    setShippingAddress,
    setPaymentMethod,
    submitOrder,
    reset,
  };
}
