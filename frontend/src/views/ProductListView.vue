<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, reactive } from "vue";
import ProductCardHorizontal from "@/components/product/ProductCardHorizontal.vue";
import request from "../stores/request";

// import { products } from "@/components/product/mockProducts";
import { productCardButtonActions } from "@/components/product/productCardButtonActions";

const userId = undefined; // if (!isLoggedIn) then make it undefined
const { cart, favorites, addToCart, addToFavorites } =
  productCardButtonActions(userId);

let products = ref([]);
onMounted(async () => {
  const res = await request.get("/products");
  products.value = res.data;
});
</script>

<template>
  <ProductCardHorizontal
    :products="products"
    @addToCart="addToCart"
    @addToFavorites="addToFavorites"
  />

  <!-- <template v-if="products.length >0">
  <ProductCardHorizontal
    :products="products"
    @addToCart="addToCart"
    @addToFavorites="addToFavorites"
  />
  </template>
  <template v-else>
    <h1>There is no product on sale</h1>
  </template> -->
</template>
