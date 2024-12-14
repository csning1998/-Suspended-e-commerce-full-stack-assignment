<script setup lang="ts">
import { onMounted, ref } from "vue";
import request from "../stores/request";

let cart = ref({});

onMounted(async () => {
   try {
      cart.value = await request.get("/carts");
   } catch (error) {}
});
</script>

<template>
   <pre>
    {{ cart }}
  </pre
   >
</template>

<style scoped></style>
