<script setup lang="ts">
import { ref } from 'vue';

interface ProductCard {
  id: number;
  image: string;
  alt: string;
  name: string;
}

const productCard = ref<ProductCard[]>([
  { id: 1, image: 'https://via.placeholder.com/100', alt: 'LP1', name: 'Lux Products 1' },
  { id: 2, image: 'https://via.placeholder.com/100', alt: 'LP2', name: 'Lux Products 2' },
  { id: 3, image: 'https://via.placeholder.com/100', alt: 'LP3', name: 'Lux Products 3' },
  { id: 4, image: 'https://via.placeholder.com/100', alt: 'LP4', name: 'Lux Products 4' },
  { id: 5, image: 'https://via.placeholder.com/100', alt: 'LP5', name: 'Lux Products 5' },
  { id: 6, image: 'https://via.placeholder.com/100', alt: 'LP6', name: 'Lux Products 6' }
]);
</script>

<template>
  <div id="app">
    <section class="categories">
      <div class="category-card" v-for="item in productCard" :key="item.id">
        <img :src="item.image" :alt="item.alt" />
        <h3>{{ item.name }}</h3>
      </div>
    </section>
    <Footer />
  </div>
</template>

<style scoped>

</style>