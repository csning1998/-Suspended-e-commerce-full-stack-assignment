<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import ProductCardVertical from "@/components/product/ProductCardVertical.vue";
import HeroSection from "@/components/common/HeroSection.vue";
import request from "../stores/request";;


// import { products } from '@/components/product/mockProducts';

let products = ref([]);
onMounted(async () => {
  const res = await request.get("/products");
  products.value = res.data;
});
</script>

<template>
  <div id="app">
    <section class="hero-section">
      <HeroSection />
    </section>

    <!-- ProductCard Section -->
    <section class="categories">
      <ProductCardVertical :products="products" />
    </section>
  </div>
</template>

<style scoped></style>
