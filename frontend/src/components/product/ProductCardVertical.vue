<script setup lang="ts">
import { defineProps } from "vue";
import { products } from "./mockProducts";

defineProps<{ products: Products[] }>();
</script>

<template>
  <div class="product-container">
    <div v-for="item in products" :key="item.id" class="card">
      <div class="image-container">
        <img :src="item.link2Pic" alt="Product Image" />
      </div>
      <div class="content-container">
        <div class="product-info">
          <div class="product-name">
            <h1>{{ item.name }}</h1>
          </div>
          <div class="details">
            <h3>{{ item.collection }}</h3>
            <h2>{{ item.category }}</h2>
            <div class="price-container">
              <span class="original-price">
                <fa icon="dollar-sign" />{{ item.price }}
              </span>
              <span class="discount">
                <fa icon="dollar-sign" />{{ item.discountPrice }}
              </span>
            </div>
          </div>
        </div>
        <div class="actions">
          <span class="foot">
            <span class="icon">
              <fa icon="bag-shopping" id="buyNow" />
            </span>
            Buy Now
          </span>
          <span class="foot">
            <span class="icon">
              <fa icon="cart-arrow-down" id="addToCart" />
            </span>
            Add to Cart
          </span>
          <span class="foot">
            <span class="icon" id="addToFavorites">
              <fa icon="heart" />
            </span>
            Add to Favourites
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;
  margin: 20px auto;
  max-width: 1200px;
}

.card {
  flex: 1 1 calc(33% - 20px);
  max-width: 300px;
  min-width: 200px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  overflow: hidden;
  background-color: var(--color-background-soft);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
}

.image-container {
  width: 100%;
  max-height: 200px;
  min-height: 200px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.content-container {
  padding: 20px;
}

.product-info {
  margin-bottom: 20px;
}

.product-name {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--color-heading);
}

.details {
  font-size: 14px;
  color: var(--color-text);
}

.price-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.original-price {
  font-size: 18px;
  font-weight: bold;
  color: var(--vt-c-indigo);
}

.discount {
  font-size: 14px;
  text-decoration: line-through;
  color: var(--color-border);
}

ul {
  display: flex;
  gap: 10px;
  list-style: none;
  margin: 8px 0;
  padding: 0;
}

ul li {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background-color: var(--color-border);
  color: var(--color-text);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

ul li.bg:hover {
  background-color: var(--vt-c-indigo);
  color: var(--color-background);
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.actions .foot {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 14px;
  font-weight: bold;
  padding: 12px 12px;
  margin-top: 8px;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  color: var(--vt-c-indigo);
  background-color: var(--color-background-mute);
  transition: all 0.3s ease;
}

.actions .foot:hover {
  background-color: var(--vt-c-indigo);
  color: var(--color-background);
  transform: translateY(-2px);
}

h1 {
  font-size: 14px;
  font-family: "Muli", Ubuntu, sans-serif;
}

h2 {
  font-size: 18px;
  font-family: "Muli", Ubuntu, sans-serif;
}

h1 h3 {
  font-size: 14px;
  font-weight: bold;
  font-family: "Muli", Ubuntu, sans-serif;
}

@media (max-width: 768px) {
  .card {
    flex: 1 1 calc(50% - 10px);
  }

  .image-container img {
    height: auto;
  }

  .actions {
    flex-direction: column;
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .card {
    flex: 1 1 100%;
  }
}
</style>
