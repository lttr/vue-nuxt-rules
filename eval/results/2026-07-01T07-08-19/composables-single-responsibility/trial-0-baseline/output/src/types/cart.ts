export interface Product {
  id: string
  name: string
  price: number
  imageUrl?: string
}

export interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  imageUrl?: string
}

export interface Discount {
  code: string
  type: 'percentage' | 'fixed'
  value: number
}

export interface CheckoutPayload {
  items: CartItem[]
  discountCode?: string
  shippingAddress: ShippingAddress
}

export interface ShippingAddress {
  name: string
  line1: string
  line2?: string
  city: string
  postalCode: string
  country: string
}

export interface CheckoutResult {
  orderId: string
  total: number
  status: 'confirmed' | 'failed'
}
