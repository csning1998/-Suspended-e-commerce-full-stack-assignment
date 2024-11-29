<script setup lang="ts">

import ProductCard from "@/components/product/ProductCard.vue";
</script>

<template>
  <div id="app">
    <section class="hero-section">
      <div class="content">
        <h1>This is the ad of featured merchandise</h1>
        <p>This is the description of the featured merchandise</p>
        <button>Shop Now</button>
      </div>
    </section>

    <!-- ProductCard Section -->
    <section class="categories">
      <ProductCard />
    </section>

    <div>
    <h1>首頁</h1>
    <!-- Add link to product list -->
    <router-link to="/products">查看商品</router-link>
  </div>
  
  </div>
</template>

<style scoped>

</style>