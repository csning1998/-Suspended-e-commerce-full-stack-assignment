<script setup lang="ts">
import ProductCardHorizontal from "@/components/product/ProductCardHorizontal.vue";

import { products } from "@/components/product/mockProducts";
import { productCardButtonActions } from "@/components/product/productCardButtonActions";

const userId = undefined; // if (!isLoggedIn) then make it undefined
const { cart, favorites, addToCart, addToFavorites } =
  productCardButtonActions(userId);
</script>

<template>
  <ProductCardHorizontal
    :products="products"
    @addToCart="addToCart"
    @addToFavorites="addToFavorites"
  />
</template>
