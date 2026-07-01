export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  imageUrl?: string
}

export interface Discount {
  code: string
  description: string
  /** 'percent' values are 0-100, 'fixed' values are a currency amount */
  type: 'percent' | 'fixed'
  value: number
}

export interface CheckoutPayload {
  items: CartItem[]
  discountCode?: string
  shippingAddressId: string
  paymentMethodId: string
}

export interface CheckoutResult {
  orderId: string
  status: 'confirmed' | 'failed'
  total: number
}
