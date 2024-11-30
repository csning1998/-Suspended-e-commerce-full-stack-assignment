<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

interface Products {
  id: number;
  name: string;
  link2Pic: string;
  price: number;
  discountPrice: number;
  collection: string;
  category: string;
  sizes: number[];
  colors: string[];
}

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
    console.log("加入購物車:", cart.value);
  } else {
    console.log("商品已存在於購物車:", product.id);
  }
};

const addToFavorites = (product: Products) => {
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
  <div class="form-container">
    <!--    <form class="form-body" @submit.prevent="onSubmit">-->
    <form class="form-body">
      <div class="form-field">
        <input type="text" placeholder="Search" />
      </div>
    </form>
  </div>
  <div class="product-container">
    <div v-for="item in products" :key="item.id" class="card">
      <div class="left">
        <img :src="item.link2Pic" alt="Product Image" />
      </div>
      <div class="right">
        <div class="product-info">
          <div class="product-name">
            <h1>{{ item.name }}</h1>
            <div class="icon-sets">
              <span class="icon"><fa icon="search" /></span>
              <span class="icon"><fa icon="user" /></span>
              <span class="icon"><fa icon="shopping-cart" /></span>
            </div>
          </div>
        </div>
        <div class="details">
          <h3>{{ item.collection }}</h3>
          <h2>{{ item.category }}</h2>
          <div class="price-container">
            <span class="original-price"
              ><fa icon="dollar-sign" />{{ item.price }}</span
            >
            <span class="discount">
              <fa icon="dollar-sign" />{{ item.discountPrice }}
            </span>
          </div>
          <ul>
            <li>SIZE</li>
            <li v-for="size in item.sizes" :key="size" class="bg">
              {{ size }}
            </li>
          </ul>
          <ul>
            <li>COLOR</li>
            <li v-for="color in item.colors" :key="color" class="bg">
              {{ color }}
            </li>
          </ul>
          <div class="actions">
            <span class="foot">
              <span class="icon">
                <fa icon="bag-shopping" />
              </span>
              Buy Now
            </span>
            <span class="foot">
              <span class="icon">
                <fa icon="cart-arrow-down" />
              </span>
              Add to Cart
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  width: 768px;
}
.card {
  display: flex;
  justify-content: space-between;
  height: 350px;
  width: 100%;
  max-width: 768px;
  margin: 20px auto;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 18px var(--color-border-hover);
}

.left {
  flex: 1 1 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 50% 50% 0;
  position: relative;
}

.left img {
  max-width: 90%;
  object-fit: contain;
}

.right {
  flex: 1 1 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  background-color: var(--color-background-soft);
  border-radius: 0 0 12px 12px;
  overflow: hidden;
}

.product-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  gap: 10px;
}

.product-name {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 22px;
  font-weight: bold;
  font-family: "Muli", Ubuntu, sans-serif;
  color: var(--color-heading);
}

.icon-sets {
  display: flex;
  align-items: center;
  gap: 24px;
}

.icon {
  margin-left: 2px;
  margin-right: 6px;
  color: var(--color-text);
  transition:
    color 0.3s ease,
    transform 0.3s ease;
}

.icon:hover {
  color: var(--vt-c-indigo);
  transform: scale(1.15);
}

.details {
  font-size: 14px;
  margin: 5px 0;
  color: var(--color-text);
  font-family: "Muli", Ubuntu, sans-serif;
}

h1 {
  font-size: 18px;
  font-family: "Muli", Ubuntu, sans-serif;
}

h2 {
  font-size: 24px;
  font-family: "Muli", Ubuntu, sans-serif;
}

h3 {
  font-size: 18px;
  font-weight: bold;
  font-family: "Muli", Ubuntu, sans-serif;
}

.details h2 {
  margin-bottom: 6px;
  font-weight: normal;
  font-family: "Muli", Ubuntu, sans-serif;
}

.price-container {
  display: flex;
  align-items: center;
  gap: 30px;
}

.original-price {
  font-size: 24px;
  font-weight: bold;
  color: var(--vt-c-indigo);
  gap: 4px;
}

.discount {
  font-size: 16px;
  font-weight: normal;
  text-decoration: line-through;
  color: var(--vt-c-divider-dark-1);
}

ul {
  display: flex;
  gap: 8px;
  list-style: none;
  margin: 8px 0;
  padding: 0;
}

ul li {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  background-color: var(--color-border);
  color: var(--color-text);
  transition: all 0.3s ease;
}

ul li.bg:hover {
  background-color: var(--vt-c-indigo);
  color: var(--color-background);
}

.actions {
  display: flex;
  margin-top: 10px;
  gap: 12px;
}

.actions .foot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  font-family: "Muli", Ubuntu, sans-serif;
  padding: 6px 10px;
  border-radius: 6px;
  background-color: var(--color-background-mute);
  border: 1px solid var(--color-border);
  color: var(--vt-c-indigo);
  transition:
    background-color 0.3s ease,
    transform 0.3s ease,
    color 0.3s ease;
}

.actions .foot:hover {
  background-color: var(--vt-c-indigo);
  color: var(--color-background);
  transform: translateY(-3px);
}

@media (max-width: 768px) {
  .card {
    flex-direction: column;
    height: auto;
    border-radius: 12px;
  }

  .left {
    height: 150px;
    width: 100%;
    border-radius: 0;
    justify-content: center;
    align-items: center;
  }

  .right {
    height: auto;
    width: 100%;
    padding: 10px;
    border-radius: 0 0 12px 12px;
  }

  .product-name {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>
