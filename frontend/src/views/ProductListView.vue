<script setup lang="ts">
import ProductDetail from "@/components/product/ProductCardHorizontal.vue";
import { reactive, ref } from "vue";

const products = reactive<Products[]>([
  {
    id: 1,
    name: "Airmax",
    link2Pic: "https://via.placeholder.com/300",
    price: 150,
    discountPrice: 200,
    collection: "Winter Collection",
    category: "Men Black Sneakers",
    sizes: [7, 8, 9, 10, 11],
    colors: ["yellow", "black", "blue"],
  },
  {
    id: 2,
    name: "Classic Runner",
    link2Pic: "https://via.placeholder.com/300",
    price: 130,
    discountPrice: 180,
    collection: "Summer Collection",
    category: "Men White Sneakers",
    sizes: [6, 7, 8, 9, 10],
    colors: ["white", "gray", "blue"],
  },
  {
    id: 3,
    name: "Urban High-tops",
    link2Pic: "https://via.placeholder.com/300",
    price: 200,
    discountPrice: 250,
    collection: "Fall Collection",
    category: "Women High Sneakers",
    sizes: [5, 6, 7, 8, 9],
    colors: ["black", "red", "pink"],
  },
  {
    id: 4,
    name: "Trail Blazer",
    link2Pic: "https://via.placeholder.com/300",
    price: 180,
    discountPrice: 220,
    collection: "Outdoor Collection",
    category: "Unisex Hiking Shoes",
    sizes: [8, 9, 10, 11, 12],
    colors: ["brown", "green", "black"],
  },
  {
    id: 5,
    name: "Everyday Comfort",
    link2Pic: "https://via.placeholder.com/300",
    price: 100,
    discountPrice: 120,
    collection: "Spring Collection",
    category: "Women Casual Shoes",
    sizes: [5, 6, 7, 8, 9],
    colors: ["beige", "blue", "white"],
  },
]);

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
