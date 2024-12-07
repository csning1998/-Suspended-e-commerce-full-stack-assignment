<script setup lang="ts">
import { defineProps } from "vue";
defineProps<{
  registrationFormData: RegistrationFormData;
  onSubmit: () => void;
}>();

function googleOAuth() {
  const url = "http://localhost:3000/auth/google";
  window.location.href = url;
}
</script>

<template>
  <div class="form-container">
    <div class="form-card">
      <h2 class="form-title">Registration</h2>

      <form class="form-body" @submit.prevent="onSubmit">
        <div class="form-field">
          <label for="userId">User ID</label>
          <input
            id="userId"
            type="text"
            v-model="registrationFormData.userId"
            required
          />
        </div>
        <div class="form-field">
          <label for="userEmail">Email</label>
          <input
            id="userEmail"
            type="email"
            v-model="registrationFormData.userEmail"
            required
          />
        </div>
        <div class="form-field">
          <label for="userPassword">Password</label>
          <input
            id="userPassword"
            type="password"
            v-model="registrationFormData.userPassword"
            required
          />
        </div>
        <div class="form-field">
          <label class="label" for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            v-model="registrationFormData.confirmPassword"
            required
          />
        </div>

        <div class="form-button-container">
          <button class="form-button" type="submit">
            <fa :icon="['fas', 'user-plus']" />Register
          </button>
        </div>

        <div class="form-button-container">
          <button type="button" class="form-button" @click="googleOAuth">
            <fa :icon="['fab', 'google']" />Sign in with Google
          </button>
          <button type="button" class="form-button" @click="googleOAuth">
            <fa :icon="['fab', 'github']" />Sign in with GitHub
          </button>
        </div>
      </form>
      <p class="signup-link">
        Already Registered？
        <router-link to="/login">Login</router-link>
      </p>
    </div>
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
