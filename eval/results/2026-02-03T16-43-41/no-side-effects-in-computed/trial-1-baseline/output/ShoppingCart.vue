<script setup>
import { ref, computed, watch } from 'vue'

const cartItems = ref([
  { id: 1, name: 'Laptop', price: 999.99, quantity: 1 },
  { id: 2, name: 'Mouse', price: 29.99, quantity: 2 },
  { id: 3, name: 'Keyboard', price: 79.99, quantity: 1 }
])

const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)
})

watch(totalPrice, (newTotal, oldTotal) => {
  console.log(`Total price changed: $${oldTotal?.toFixed(2) ?? '0.00'} -> $${newTotal.toFixed(2)}`)
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
        <div class="item-info">
          <span class="item-name">{{ item.name }}</span>
          <span class="item-price">${{ item.price.toFixed(2) }}</span>
        </div>
        <div class="item-controls">
          <button @click="updateQuantity(item, -1)" :disabled="item.quantity === 0">-</button>
          <span class="quantity">{{ item.quantity }}</span>
          <button @click="updateQuantity(item, 1)">+</button>
          <button @click="removeItem(item.id)" class="remove-btn">Remove</button>
        </div>
        <div class="item-subtotal">
          Subtotal: ${{ (item.price * item.quantity).toFixed(2) }}
        </div>
      </li>
    </ul>

    <div class="cart-total">
      <strong>Total: ${{ totalPrice.toFixed(2) }}</strong>
    </div>
  </div>
</template>

<style scoped>
.shopping-cart {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  margin-bottom: 20px;
  border-bottom: 2px solid #333;
  padding-bottom: 10px;
}

.empty-cart {
  text-align: center;
  color: #666;
  padding: 40px;
}

.cart-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
}

.item-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.item-name {
  font-weight: bold;
}

.item-price {
  color: #666;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.item-controls button {
  padding: 5px 12px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f5f5f5;
}

.item-controls button:hover:not(:disabled) {
  background: #e0e0e0;
}

.item-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.remove-btn {
  margin-left: auto;
  color: #d32f2f;
  border-color: #d32f2f !important;
}

.quantity {
  min-width: 30px;
  text-align: center;
}

.item-subtotal {
  text-align: right;
  color: #666;
  font-size: 0.9em;
}

.cart-total {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 2px solid #333;
  text-align: right;
  font-size: 1.2em;
}
</style>
