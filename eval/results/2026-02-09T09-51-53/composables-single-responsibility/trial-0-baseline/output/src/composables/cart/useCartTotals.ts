import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import type { CartItem, CartTotals, Discount } from './types';

const TAX_RATE = 0.08;

export function useCartTotals(items: Ref<CartItem[]>) {
  const discount = ref<Discount | null>(null);
  const taxRate = ref(TAX_RATE);

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  const discountAmount = computed(() => {
    if (!discount.value) return 0;
    if (discount.value.type === 'percentage') {
      return subtotal.value * (discount.value.value / 100);
    }
    return Math.min(discount.value.value, subtotal.value);
  });

  const tax = computed(
    () => (subtotal.value - discountAmount.value) * taxRate.value,
  );

  const total = computed(
    () => subtotal.value - discountAmount.value + tax.value,
  );

  const totals = computed<CartTotals>(() => ({
    subtotal: subtotal.value,
    discountAmount: discountAmount.value,
    tax: tax.value,
    total: total.value,
  }));

  function applyDiscount(newDiscount: Discount) {
    discount.value = newDiscount;
  }

  function removeDiscount() {
    discount.value = null;
  }

  return {
    discount,
    taxRate,
    subtotal,
    discountAmount,
    tax,
    total,
    totals,
    applyDiscount,
    removeDiscount,
  };
}
