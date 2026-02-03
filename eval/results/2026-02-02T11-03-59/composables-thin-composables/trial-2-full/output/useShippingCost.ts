import { computed, type Ref } from "vue"

// Functional core — pure, testable without Vue
export function calculateShippingCost(
  weightKg: number,
  zone: "domestic" | "international",
  orderTotal: number
): number {
  if (orderTotal > 100) return 0

  if (zone === "international") return 15 + 3 * weightKg
  return 5 + 1 * weightKg
}

// Imperative shell — thin composable
export function useShippingCost(
  weightKg: Ref<number>,
  zone: Ref<"domestic" | "international">,
  orderTotal: Ref<number>
) {
  const cost = computed(() =>
    calculateShippingCost(weightKg.value, zone.value, orderTotal.value)
  )

  return { cost }
}
