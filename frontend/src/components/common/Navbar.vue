<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

interface NavLink {
  text: string;
  href: string;
}

const navLinks = ref<NavLink[]>([
  { text: "Management", href: "./seller-product-management" },
  { text: "Products", href: "./Products" },
  { text: "Favourites", href: "#" },
  { text: "Shopping Cart", href: "#" },
  { text: "Ships to", href: "#" },
  { text: "Notifications", href: "#" },
]);

const token = localStorage.getItem("token");
const isLoggedIn = ref(!!token);
const router = useRouter();

window.addEventListener("userLoggedIn", () => {
  isLoggedIn.value = true;
});

window.addEventListener("userLoggedOut", () => {
  isLoggedIn.value = false;
});

function navLinkHandler(link: NavLink) {
  if (link.href === "#") {
    return;
  }
  router.push(link.href);
}
</script>

<template>
  <header class="navbar">
    <div class="logo">
      <button href="/" @click.prevent="router.push('/')">
        E-Commerce WebApp
      </button>
    </div>
    <nav>
      <a
        v-for="(link, index) in navLinks"
        :key="index"
        :href="link.href"
        @click.prevent="navLinkHandler(link)"
      >
        {{ link.text }}
      </a>

      <a v-if="!isLoggedIn" href="/login" @click.prevent="router.push('/login')"
        >Login</a
      >
      <a v-else href="/profile" @click.prevent="router.push('/profile')"
        >Profile</a
      >
    </nav>
  </header>
</template>

<style scoped></style>
