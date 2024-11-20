<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  loginFormData: LoginFormData;
  onSubmit: () => void;
}>();
</script>

<template>
  <div class="form-container">
    <div class="form-card">
      <h2 class="form-title">Login</h2>

      <form class="form-body" @submit.prevent="onSubmit">
        <div class="form-field">
          <label for="userName">Username</label>
          <input
            id="userName"
            type="text"
            v-model="loginFormData.userName"
            required
          />
        </div>

        <div class="form-field">
          <label for="userPassword">Password</label>
          <input
            id="userPassword"
            type="password"
            v-model="loginFormData.userPassword"
            required
          />
        </div>
        <div class="form-button-container">
          <button class="form-button" type="submit">Login</button>
        </div>
      </form>
      <p class="signup-link">
        Not Registered？
        <router-link to="/register">Create an account</router-link>
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
