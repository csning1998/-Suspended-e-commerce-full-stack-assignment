<script setup lang="ts">
import {ref} from 'vue';

interface FooterLink {
  text: string;
  href: string;
}

const footerLinks = ref<FooterLink[]>([
  {text: 'Privacy Policy', href: 'PrivacyPolicy'},
  {text: 'Terms of Services', href: 'Terms of Services'},
  {text: 'Contact Us', href: 'ContactUs'},
]);

</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2024 E-Commerce WebApp. All rights reserved.</p>
      <nav>
        <a v-for="(link, index) in footerLinks" :key="index" :href="link.href">
          {{ link.text }}
        </a>
      </nav>
    </div>
  </footer>
</template>

<style scoped>

</style>