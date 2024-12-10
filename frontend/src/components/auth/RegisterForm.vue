<script setup lang="ts">
import { defineProps, ref } from "vue";

defineProps<{
   registrationFormData: RegistrationFormData;
   onSubmit: () => void;
}>();

const registrationFormData = ref<RegistrationFormData>({
   userId: "root",
   userEmail: "nephew.UncleRoger@noreply.gmail.com",
   userFamilyName: "Uncle",
   userGivenName: "Roger",
   userPassword: "Root001@admin",
   confirmPassword: "Root001@admin",
});

const isVisible = ref(false);
const toggleVisibility = () => {
   isVisible.value = !isVisible.value;
};

const requiredRule = (value: string): true | string => {
   return !!value || "Required.";
};

const emailRule = (value: string): true | string => {
   const pattern = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
   return (
      pattern.test(value) ||
      "You may evaluate if your input matches the email pattern."
   );
};

const passwordRule = (value: string): true | string => {
   const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
   return (
      pattern.test(value) ||
      "Min. 8 chars with at least one uppercase, one number, and one special character."
   );
};

const confirmPasswordRule = (value: string): boolean | string => {
   return (
      value === registrationFormData.value.userPassword ||
      "Passwords do not match."
   );
};

const userEmailRules = [requiredRule, emailRule];
const userPasswordRules = [requiredRule, passwordRule];
const confirmPasswordRules = [requiredRule, confirmPasswordRule];

function googleOAuth() {
   window.location.href = "http://localhost:3000/auth/google";
}

function githubOAuth() {
   window.location.href = "http://localhost:3000/auth/github";
}
</script>

<template>
   <div class="form-container">
      <v-card class="vuerify-card" max-width="1000">
         <v-form>
            <div class="form-card">
               <h2 class="form-title">Registration</h2>
               <v-col cols="12">
                  <v-text-field
                     clearable
                     variant="outlined"
                     label="Setting your User ID"
                     :rules="[requiredRule]"
                     maxlength="20"
                     counter
                     v-model="registrationFormData.userId"
                  >
                     <template #prepend-inner>
                        <fa class="icon" :icon="['fas', 'user']" />
                     </template>
                  </v-text-field>
               </v-col>
               <v-col cols="12">
                  <v-text-field
                     clearable
                     variant="outlined"
                     label="Enter your Email"
                     v-model="registrationFormData.userEmail"
                     :rules="userEmailRules"
                  >
                     <template #prepend-inner>
                        <fa class="icon" :icon="['fas', 'envelope']" />
                     </template>
                  </v-text-field>
               </v-col>
               <v-col cols="12">
                  <v-text-field
                     clearable
                     counter
                     variant="outlined"
                     :type="isVisible ? 'text' : 'password'"
                     v-model="registrationFormData.userPassword"
                     label="Enter your password"
                     :rules="userPasswordRules"
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
               <v-col cols="12">
                  <v-text-field
                     clearable
                     variant="outlined"
                     :type="isVisible ? 'text' : 'password'"
                     minlength="8"
                     counter
                     v-model="registrationFormData.confirmPassword"
                     label="Confirm your password"
                     :rules="confirmPasswordRules"
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
               <div class="form-body" @submit.prevent="onSubmit">
                  <div class="form-button-container">
                     <button class="form-button" type="submit">
                        <fa :icon="['fas', 'user-plus']" />Register
                     </button>
                  </div>
                  <div class="form-button-container">
                     <button
                        type="button"
                        class="form-button"
                        @click="googleOAuth"
                     >
                        <fa :icon="['fab', 'google']" />Sign up with Google
                     </button>
                     <button
                        type="button"
                        class="form-button"
                        @click="githubOAuth"
                     >
                        <fa :icon="['fab', 'github']" />Sign up with GitHub
                     </button>
                  </div>
               </div>

               <p class="signup-link">
                  Already Registered？
                  <router-link to="/login">Login</router-link>
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
