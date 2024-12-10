<script setup lang="ts">
import { defineProps, ref } from "vue";

defineProps<{
   loginFormData: LoginFormData;
   onSubmit: () => void;
}>();

const isVisible = ref(false);

// Function to toggle visibility
const toggleVisibility = (): void => {
   isVisible.value = !isVisible.value;
   console.log("isVisible.value", isVisible.value);
};

function googleOAuth() {
   window.location.href = "http://localhost:3000/auth/google";
}
</script>

<template>
   <div class="form-container">
      <v-card class="vuerify-card" max-width="1000">
         <v-form>
            <div class="form-card">
               <h2 class="form-title">Login</h2>
               <v-col cols="12">
                  <v-text-field
                     clearable
                     variant="outlined"
                     label="Enter your Email or user ID"
                  >
                     <template #prepend-inner>
                        <fa class="icon" :icon="['fas', 'envelope']" />
                     </template>
                  </v-text-field>
               </v-col>
               <v-col cols="12">
                  <v-text-field
                     clearable
                     variant="outlined"
                     :type="isVisible ? 'text' : 'password'"
                     label="Enter your password"
                  >
                     <template #prepend-inner>
                        <fa class="icon" :icon="['fas', 'lock']" />
                     </template>
                     <template #append-inner>
                        <v-btn icon @click="toggleVisibility">
                           <v-icon>
                              <i
                                 :class="
                                    isVisible
                                       ? 'far fa-eye-slash'
                                       : 'far fa-eye'
                                 "
                              ></i>
                           </v-icon>
                        </v-btn>
                     </template>
                  </v-text-field>
               </v-col>
               <v-card-text class="text-medium-emphasis text-caption">
                  Warning: After 3 consecutive failed login attempts, your
                  account will be temporarily locked for three hours. If you
                  must login now, you can also click "Forgot login password?"
                  below to reset the login password.
               </v-card-text>
               <div class="form-body" @submit.prevent="onSubmit">
                  <div class="form-button-container">
                     <button class="form-button" type="submit">
                        <fa :icon="['fas', 'right-to-bracket']" />Login
                     </button>
                  </div>
                  <div class="form-button-container">
                     <button
                        type="button"
                        class="form-button"
                        @click="googleOAuth"
                     >
                        <fa :icon="['fab', 'google']" />Sign in with Google
                     </button>
                     <button
                        type="button"
                        class="form-button"
                        @click="googleOAuth"
                     >
                        <fa :icon="['fab', 'github']" />Sign in with GitHub
                     </button>
                  </div>
               </div>

               <p class="signup-link">
                  Not Registered？
                  <router-link to="/register">Create an account</router-link>
               </p>
            </div>
         </v-form>
      </v-card>
   </div>
</template>

<style scoped>
.signup-link {
   text-align: center;
   margin-top: 16px;
   font-size: 14px;
}

.signup-link a {
   color: #4285f4;
   text-decoration: none;
}
</style>
