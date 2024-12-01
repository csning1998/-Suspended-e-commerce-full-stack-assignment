<script setup lang="ts">
import ProductCard from "@/components/product/ProductCardVertical.vue";
import HeroSection from "@/components/common/HeroSection.vue";
</script>

<template>
  <div id="app">
    <section class="hero-section">
      <HeroSection />
    </section>

    <!-- ProductCard Section -->
    <section class="categories">
      <ProductCard />
    </section>
  </div>
</template>

<style scoped></style>
