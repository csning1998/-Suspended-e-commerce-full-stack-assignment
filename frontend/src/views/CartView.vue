<script setup lang="ts">
import { onMounted, ref } from "vue";
import request from "../stores/request";
import QuantitySelector from "@/components/cart/QuantitySelector.vue";
interface Cart {
   items: CartItem[];
   totalAmount: number;
}



interface CartItem {
// interface CartItem<T = Record<string, number>| string[] > {
   amount: number,
   title: string,
   priceDetail: Record<string, number>;
   // metadata: T;
   subtotal: number;
}

// const item: CartItem = {
//    amount: 10,
//    name: "hello",
//    priceDetail: {
//       discount: 10,
//       originalPrice: 100,
//    }
// }


let cart = ref<Cart>({
   items: [],
   totalAmount: 0
});

console.log("item", cart.value.items)

onMounted(async () => {
   try {
      cart.value = await request.get("/carts");
   } catch (error) {}
});

</script>

<template>
   <div>
    <!-- {{ cart }} -->
    <div v-for="item in cart.items">
      <h3>{{ item.title }}</h3>
      <QuantitySelector v-model="item.amount" />
      <span class="subtotal">
         subtotal: {{ item.subtotal }}
      </span>
    </div>

    <h2>Total Amount : {{ cart.totalAmount }}</h2>


   </div>
</template>

<style scoped></style>
