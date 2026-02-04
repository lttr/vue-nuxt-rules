<script setup>
import { ref, computed, watch } from 'vue'

const items = ref([
  { id: 1, name: 'Apple', price: 1.50, quantity: 3 },
  { id: 2, name: 'Bread', price: 2.99, quantity: 1 },
  { id: 3, name: 'Milk', price: 3.49, quantity: 2 }
])

const totalPrice = computed(() => {
  return items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

// Use a watcher to log changes - keeps computed pure
watch(totalPrice, (newTotal, oldTotal) => {
  console.log(`Total price changed: $${oldTotal?.toFixed(2) ?? '0.00'} -> $${newTotal.toFixed(2)}`)
}, { immediate: true })

function updateQuantity(id, delta) {
  const item = items.value.find(i => i.id === id)
  if (item) {
    item.quantity = Math.max(0, item.quantity + delta)
  }
}

function removeItem(id) {
  items.value = items.value.filter(i => i.id !== id)
}
</script>

<template>
  <div class="shopping-cart">
    <h2>Shopping Cart</h2>

    <div v-if="items.length === 0" class="empty-cart">
      Your cart is empty
    </div>

    <ul v-else class="cart-items">
      <li v-for="item in items" :key="item.id" class="cart-item">
        <span class="item-name">{{ item.name }}</span>
        <span class="item-price">${{ item.price.toFixed(2) }}</span>
        <div class="quantity-controls">
          <button @click="updateQuantity(item.id, -1)">-</button>
          <span class="quantity">{{ item.quantity }}</span>
          <button @click="updateQuantity(item.id, 1)">+</button>
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
  max-width: 500px;
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
  gap: 12px;
  padding: 12px 0;
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
  background: #fff;
  cursor: pointer;
  border-radius: 4px;
}

.quantity-controls button:hover {
  background: #f0f0f0;
}

.quantity {
  min-width: 20px;
  text-align: center;
}

.item-subtotal {
  min-width: 60px;
  text-align: right;
  font-weight: 500;
}

.remove-btn {
  padding: 4px 8px;
  border: none;
  background: #ff4444;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.remove-btn:hover {
  background: #cc0000;
}

.cart-total {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #333;
  text-align: right;
  font-size: 1.2em;
}

.empty-cart {
  text-align: center;
  color: #666;
  padding: 40px 0;
}
</style>
