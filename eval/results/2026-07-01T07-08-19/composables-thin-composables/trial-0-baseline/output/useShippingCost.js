import { computed, unref } from 'vue'

const RATES = {
  domestic: { base: 5, perKg: 1 },
  international: { base: 15, perKg: 3 },
}

const FREE_SHIPPING_THRESHOLD = 100

/**
 * @param {import('vue').Ref<number>|number} weightKg
 * @param {import('vue').Ref<'domestic'|'international'>|'domestic'|'international'} zone
 * @param {import('vue').Ref<number>|number} orderTotal
 */
export function useShippingCost(weightKg, zone, orderTotal) {
  const cost = computed(() => {
    const weight = Number(unref(weightKg)) || 0
    const total = Number(unref(orderTotal)) || 0
    const zoneKey = unref(zone)

    if (total >= FREE_SHIPPING_THRESHOLD) return 0

    const rate = RATES[zoneKey]
    if (!rate) throw new Error(`Unknown shipping zone: ${zoneKey}`)

    return rate.base + rate.perKg * weight
  })

  return { cost }
}
