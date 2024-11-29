<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

interface Product {
  id: string;
  link2Pic: string;
  name: string;
  price: string;
  description: string;
}

interface SimilarItem {
  id: string;
  name: string;
  link2Pic: string;
  price: string;
}

const products = reactive<Product[]>([
  {
    id: "1",
    name: "Jordan 1",
    link2Pic: "https://via.placeholder.com/150",
    price: "$200",
    description: "Classic Jordan 1 sneaker",
  },
  {
    id: "2",
    name: "Air Max 90",
    link2Pic: "https://via.placeholder.com/150",
    price: "$150",
    description: "Iconic Nike Air Max 90",
  },
  {
    id: "3",
    name: "Yeezy Boost 350",
    link2Pic: "https://via.placeholder.com/150",
    price: "$220",
    description: "Yeezy Boost 350 V2",
  },
]);

const similarItems: SimilarItem[] = [
  {
    id: "1",
    name: "Air Max 90",
    price: "$150",
    link2Pic: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "Yeezy Boost 350",
    price: "$220",
    link2Pic: "https://via.placeholder.com/150",
  },
];

const cart = ref<Product[]>([]);
const favorites = ref<Product[]>([]);

const addToCart = (product: Product) => {
  const exists = cart.value.find((item) => item.id === product.id);
  if (!exists) {
    cart.value.push(product);
    console.log("加入購物車:", cart.value);
  } else {
    console.log("商品已存在於購物車:", product.id);
  }
};

const addToFavorites = (product: Product) => {
  const exists = favorites.value.find((item) => item.id === product.id);
  if (!exists) {
    favorites.value.push(product);
    console.log("加入收藏夾:", favorites.value);
  } else {
    console.log("商品已存在於收藏夾:", product.id);
  }
};

const handleProductClick = (id: string) => {
  const router = useRouter();
  router.push(`/product/${id}`);
};

onMounted(() => {
  // fetchProductDetails();
});
</script>

<template>
  <div class="product-container">
    <div class="search-bar">
      <input type="text" placeholder="Search" />
    </div>
    <div class="product-info">
      <div class="product-details" v-for=" item in products">
        <div class="products" v-if="products">
          <div class="product-image">
            <img :src="item.link2Pic" alt="Product Image" />
          </div>
          <div class="product-name">
            <h3>{{ item.name }}</h3>
          </div>
          <div class="product-description">
            <p>價格：{{ item.price }}</p>
            <p>描述：{{ item.description }}</p>
          </div>
          <div class="button-container">
            <button @click="addToCart(item)">加入購物車</button>
            <button @click="addToFavorites(item)">加入收藏夾</button>
          </div>
        </div>
        <div v-else>
          <h3> Can't fetch the products</h3>
        </div>
      </div>
    </div>
    <div class="similar-items">
      <h2>類似商品</h2>
      <div v-for="item in similarItems" :key="item.id" class="item-card">
        <img :src="item.link2Pic" alt="Similar Item Image" />
        <h3>{{ item.name }}</h3>
        <p>價格：{{ item.price }}</p>
        <button @click="handleProductClick(item.id)">查看商品</button>
      </div>
    </div>
  </div>
</template>



<style scoped>
.product-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.search-bar input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.product-info {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 5px;
}

.product-image img {
  max-width: 100px;
  margin-bottom: 10px;
}

.similar-items {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.item-card {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  width: 150px;
  text-align: center;
}

.item-card img {
  max-width: 100%;
  margin-bottom: 10px;
}

button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
