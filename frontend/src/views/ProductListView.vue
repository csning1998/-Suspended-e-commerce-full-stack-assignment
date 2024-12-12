<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, reactive, computed } from "vue";
import ProductCardHorizontal from "@/components/product/ProductCardHorizontal.vue";
import request from "../stores/request";

// import { products } from "@/components/product/mockProducts";
import { productCardButtonActions } from "@/lib/productCardButtonActions";

const userId = undefined; // if (!isLoggedIn) then make it undefined
const { cart, favorites, addToCart, addToFavorites } =
   productCardButtonActions(userId);

let products = ref([]);
onMounted(async () => {
   products.value = await request.get("/products");
});

import overlayStore from "@/stores/overlay";
const store = overlayStore();
const overlay = computed(() => store.overlay);
</script>

<template>
   <ProductCardHorizontal
      v-if="products.length > 0"
      :products="products"
      @addToCart="addToCart"
      @addToFavorites="addToFavorites"
   />

   <h1 v-if="!overlay && products.length === 0">There is no product on sale</h1>
</template>

<style scoped>
/* body {
    font-size: 60px;
  } */

h1 {
   text-align: center;
   margin-top: 5em;
}
</style>
