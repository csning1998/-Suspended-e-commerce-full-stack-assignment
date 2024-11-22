<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps<{
  registrationFormData: RegistrationFormData;
  onSubmit: () => void;
}>();
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
          <label for="userEmail">Family Name</label>
          <input
            id="userFamilyName"
            type="text"
            v-model="registrationFormData.userFamilyName"
            required
          />
          <label for="userEmail">Given Name</label>
          <input
            id="userGivenName"
            type="text"
            v-model="registrationFormData.userGivenName"
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
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            v-model="registrationFormData.confirmPassword"
            required
          />
        </div>
        <div class="form-button-container">
          <button class="form-button" type="submit">Register</button>
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
