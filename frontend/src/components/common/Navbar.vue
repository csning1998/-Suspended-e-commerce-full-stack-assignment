<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

interface NavLink {
  text: string;
  href: string;
}

const navLinks = ref<NavLink[]>([
  { text: "Favourites", href: "#" },
  { text: "Shopping Cart", href: "#" },
  { text: "Ships to", href: "#" },
  { text: "Notifications", href: "#" },
  // { text: "Login / Logout", href: "/login", auth: false },
  // { text: "Profile", href: "/profile", auth: true },
]);

// To-do: This should be further implemented by other controller or handler instead of hardcoding.
const isLoggedIn = ref(localStorage.getItem("isLoggedIn") === "true"); // Use ref

console.log("Is the user logged in? ", isLoggedIn.value);

const router = useRouter();

onMounted(() => {
  window.addEventListener("userLoggedIn", () => {
    isLoggedIn.value = true;
  });
  window.addEventListener("userLoggedOut", () => {
    isLoggedIn.value = false;
  });
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
      <a href="/" @click.prevent="router.push('/')"> E-Commerce WebApp</a>
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
