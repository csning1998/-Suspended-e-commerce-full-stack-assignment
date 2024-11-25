<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

interface FooterLink {
  text: string;
  href: string;
}

const router = useRouter();

const footerLinks = ref<FooterLink[]>([
  { text: "Privacy Policy", href: "/privacy-policy" },
  { text: "Terms of Services", href: "/terms-of-service" },
  { text: "Contact Us", href: "ContactUs" },
]);

const Nav2Push = (link: FooterLink) => {
  router.push(link.href);
};
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2024 E-Commerce WebApp. All rights reserved.</p>
      <nav>
        <li v-for="(link, index) in footerLinks" :key="index" :href="link.href">
          <a @click.prevent="Nav2Push(link)">{{ link.text }}</a>
        </li>
      </nav>
    </div>
  </footer>
</template>

<style scoped></style>
