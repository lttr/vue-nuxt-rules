<script setup>
/**
 * Usage example — drop this into an App.vue or any parent component
 * to see ProductPage in action with mock data.
 */
import ProductPage from './ProductPage.vue'

const product = {
  id: 101,
  title: 'Wireless Noise-Cancelling Headphones',
  description:
    'Experience immersive audio with our flagship wireless headphones. ' +
    'Featuring advanced active noise cancellation, 40mm custom drivers, ' +
    'and up to 30 hours of battery life on a single charge. The ergonomic ' +
    'over-ear design with memory-foam cushions keeps you comfortable during ' +
    'long listening sessions. Bluetooth 5.3 ensures a rock-solid connection ' +
    'with support for LDAC and aptX HD codecs. Whether you are commuting, ' +
    'working from home, or relaxing, these headphones deliver studio-quality ' +
    'sound wherever you go. Includes a carrying case, USB-C charging cable, ' +
    'and a 3.5mm auxiliary cable for wired use.',
  price: 249.99,
  images: [
    'https://picsum.photos/seed/hp1/600/600',
    'https://picsum.photos/seed/hp2/600/600',
    'https://picsum.photos/seed/hp3/600/600',
    'https://picsum.photos/seed/hp4/600/600',
  ],
  maxQuantity: 10,
  reviewsUrl: '/api/reviews/101', // replace with a real endpoint or mock server
}

function onAddToCart(payload) {
  console.log('Add to cart:', payload)
}
</script>

<template>
  <ProductPage :product="product" @add-to-cart="onAddToCart" />
</template>
