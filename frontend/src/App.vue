<script setup lang="ts">
// @ts-nocheck
import Navbar from "@/components/common/Navbar.vue";
import Footer from "@/components/common/Footer.vue";
import { computed } from "vue";
import overlayStore from "@/stores/overlay";

const store = overlayStore();
const overlay = computed(() => store.overlay);

/*
let windowObjectReference = null;
let previousUrl = null;

const receiveMessage = event => {
 // Do we trust the sender of this message? (might be
 // different from what we originally opened, for example).
 if (event.origin !== BASE_URL) {
   return;
 }
 const { data } = event;
 // if we trust the sender and the source is our popup
 if (data.source === 'lma-login-redirect') {
   // get the URL params and redirect to our server to use Passport to auth/login
   const { payload } = data;
   const redirectUrl = `/auth/google/login${payload}`;
   window.location.pathname = redirectUrl;
 }
};

// https://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen
 const popupCenter = ({url, title, w, h}) => {
    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop
    const newWindow = window.open(url, title,
      `
      scrollbars=yes,
      width=${w / systemZoom},
      height=${h / systemZoom},
      top=${top},
      left=${left}
      `
    )

    if (window.focus) newWindow.focus();
}
*/
</script>

<template>
   <div>
      <!--        <div v-html="view"></div>-->

      <!-- Navbar Component -->
      <Navbar />

      <!-- Hero Section -->
      <router-view />

      <!-- Footer Component -->
      <Footer />

      <v-overlay v-model="overlay"></v-overlay>
      <span v-if="overlay" class="loader"></span>
   </div>
</template>

<style scoped>
.loader {
   position: fixed;
   top: 50%;
   left: 50%;
   width: 48px;
   height: 48px;
   border: 5px solid #fff;
   border-bottom-color: transparent;
   border-radius: 50%;
   display: inline-block;
   box-sizing: border-box;
   animation: rotation 1s linear infinite;
}

@keyframes rotation {
   0% {
      transform: rotate(0deg);
   }
   100% {
      transform: rotate(360deg);
   }
}
</style>
