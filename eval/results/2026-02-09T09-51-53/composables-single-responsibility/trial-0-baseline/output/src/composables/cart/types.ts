export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Discount {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
}

export interface CartTotals {
  subtotal: number;
  discountAmount: number;
  tax: number;
  total: number;
}

export interface CheckoutPayload {
  items: CartItem[];
  totals: CartTotals;
  discount: Discount | null;
  shippingAddress?: ShippingAddress;
  paymentMethodId?: string;
}

export interface ShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderConfirmation {
  orderId: string;
  status: string;
  estimatedDelivery?: string;
}

export interface CartApiResponse {
  items: CartItem[];
  discount: Discount | null;
}
