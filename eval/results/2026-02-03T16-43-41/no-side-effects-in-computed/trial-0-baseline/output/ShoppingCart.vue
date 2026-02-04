<script setup>
import { ref, computed, watch } from 'vue'

const cartItems = ref([
  { id: 1, name: 'Laptop', price: 999.99, quantity: 1 },
  { id: 2, name: 'Headphones', price: 149.99, quantity: 2 },
  { id: 3, name: 'Mouse', price: 29.99, quantity: 1 }
])

const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)
})

watch(totalPrice, (newTotal, oldTotal) => {
  console.log(`Total price changed: $${oldTotal?.toFixed(2) ?? '0.00'} → $${newTotal.toFixed(2)}`)
})

function updateQuantity(item, delta) {
  const newQuantity = item.quantity + delta
  if (newQuantity >= 0) {
    item.quantity = newQuantity
  }
}

function removeItem(id) {
  const index = cartItems.value.findIndex(item => item.id === id)
  if (index !== -1) {
    cartItems.value.splice(index, 1)
  }
}
</script>

<template>
  <div class="shopping-cart">
    <h2>Shopping Cart</h2>

    <div v-if="cartItems.length === 0" class="empty-cart">
      Your cart is empty
    </div>

    <ul v-else class="cart-items">
      <li v-for="item in cartItems" :key="item.id" class="cart-item">
        <span class="item-name">{{ item.name }}</span>
        <span class="item-price">${{ item.price.toFixed(2) }}</span>
        <div class="quantity-controls">
          <button @click="updateQuantity(item, -1)">-</button>
          <span class="quantity">{{ item.quantity }}</span>
          <button @click="updateQuantity(item, 1)">+</button>
        </div>
        <span class="item-subtotal">${{ (item.price * item.quantity).toFixed(2) }}</span>
        <button class="remove-btn" @click="removeItem(item.id)">Remove</button>
      </li>
    </ul>

    <div class="cart-total">
      <strong>Total: ${{ totalPrice.toFixed(2) }}</strong>
    </div>
  </div>
</template>

<style scoped>
.shopping-cart {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
}

.cart-items {
  list-style: none;
  padding: 0;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.item-name {
  flex: 1;
  font-weight: 500;
}

.item-price {
  color: #666;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity-controls button {
  width: 28px;
  height: 28px;
  border: 1px solid #ccc;
  background: #f5f5f5;
  cursor: pointer;
  border-radius: 4px;
}

.quantity-controls button:hover {
  background: #e0e0e0;
}

.quantity {
  min-width: 20px;
  text-align: center;
}

.item-subtotal {
  min-width: 80px;
  text-align: right;
  font-weight: 500;
}

.remove-btn {
  padding: 5px 10px;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.remove-btn:hover {
  background: #cc0000;
}

.cart-total {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 2px solid #333;
  text-align: right;
  font-size: 1.2em;
}

.empty-cart {
  text-align: center;
  padding: 40px;
  color: #666;
}
</style>
