<script setup lang="ts">
import ProductDetail from "@/components/product/ProductCardHorizontal.vue";
import { reactive, ref } from "vue";

const cart = ref<Products[]>([]);
const favorites = ref<Products[]>([]);

const addToCart = (product: Products) => {
  const exists = cart.value.find((item) => item.id === product.id);
  if (!exists) {
    cart.value.push(product);
    console.log("Added to cart", cart.value);
  } else {
    console.log("Already in the cart:", product.id);
  }
};

const addToFavorites = (product: Products) => {
  const exists = favorites.value.find((item) => item.id === product.id);
  if (!exists) {
    favorites.value.push(product);
    console.log("Added to the favorites. ", favorites.value);
  } else {
    console.log("Already in the favorites. ", product.id);
  }
};
</script>

<template>
  <ProductDetail :products="products" />
</template>
