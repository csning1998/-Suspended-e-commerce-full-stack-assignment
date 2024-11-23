<script setup lang="ts">
import Navbar from "@/components/common/Navbar.vue";
import Footer from "@/components/common/Footer.vue";
import HomeView from "@/views/HomeView.vue";
</script>

<template>
  <div>
    <!-- Navbar Component -->
    <Navbar />

    <!-- Hero Section -->
    <router-view />

    <!-- Footer Component -->
    <Footer />
  </div>
</template>

<style scoped>
</style>
