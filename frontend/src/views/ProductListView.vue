<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const productId = route.params.id as string

const name = ref('')
const price = ref('')
const description = ref('')
const similarItems = ref([
  { id: 1, name: 'Air Max 90', price: '$150' },
  { id: 2, name: 'Yeezy Boost 350', price: '$220' },
])

const cart = ref<Array<{ id: string; name: string; price: string }>>([])
const favorites = ref<Array<{ id: string; name: string; price: string }>>([])

const fetchProductDetails = () => {
  switch(productId) {
    case '1':
      name.value = 'Jordan 1'
      price.value = '$200'
      description.value = 'Classic Jordan 1 sneaker'
      break
    case '2':
      name.value = 'Air Max 90'
      price.value = '$150'
      description.value = 'Iconic Nike Air Max 90'
      break
    case '3':
      name.value = 'Yeezy Boost 350'
      price.value = '$220'
      description.value = 'Yeezy Boost 350 V2'
      break
  }
}

onMounted(() => {
  fetchProductDetails()
})

const handleProductClick = (id: number) => {
  router.push(`/product/${id}`)
}

const addToCart = () => {
  const existingItem = cart.value.find((item) => item.id === productId)
  if (!existingItem) {
    cart.value.push({ id: productId, name: name.value, price: price.value })
    console.log('加入購物車:', cart.value)
  } else {
    console.log('商品已存在於購物車:', productId)
  }
}

const addToFavorites = () => {
  const existingItem = favorites.value.find((item) => item.id === productId)
  if (!existingItem) {
    favorites.value.push({ id: productId, name: name.value, price: price.value })
    console.log('加入收藏夾:', favorites.value)
  } else {
    console.log('商品已存在於收藏夾:', productId)
  }
}
</script>

<template>
  <div class="container">
    <div class="search-bar">
      <input type="text" placeholder="Search" />
    </div>
    <div class="product-info">
      <div class="product-image">
        <!-- picture -->
      </div>
      <div class="product-details">
        <div class="name">{{ name }}</div>
        <div class="price">{{ price }}</div>
        <button @click="addToCart" class="btn-add-to-cart">Buy it</button>
        <button @click="addToFavorites" class="btn-add-to-favorites">Add to ♥</button>
      </div>
    </div>
    <div class="similar-items">
      <div v-for="item in similarItems" :key="item.id" class="item-card">
        <h3>{{ item.name }}</h3>
        <p>Price: {{ item.price }}</p>
        <button @click="handleProductClick(item.id)">View</button>
      </div>
    </div>
    <div class="product-description">
      {{ description }}
    </div>
  </div>
</template>