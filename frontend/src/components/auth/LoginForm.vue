<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  loginFormData: LoginFormData;
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
      <h2 class="form-title">Login</h2>

      <form class="form-body" @submit.prevent="onSubmit">
        <div class="form-field">
          <label for="userName">Enter your Email or user ID</label>
          <input
            id="userName"
            type="text"
            v-model="loginFormData.userId"
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
      <div>
        <button
          type="button"
          class="google-sign-in-button"
          @click="googleOAuth"
        >
          Sign in with Google
        </button>
      </div>
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

.google-sign-in-button {
  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;

  padding: 12px 16px 12px 42px;
  border: none;
  border-radius: 3px;
  box-shadow:
    0 -1px 0 rgba(0, 0, 0, 0.04),
    0 1px 1px rgba(0, 0, 0, 0.25);

  color: #757575;
  font-size: 14px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;

  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
  background-color: white;
  background-repeat: no-repeat;
  background-position: 12px 11px;
}

.google-sign-in-button:hover {
  box-shadow:
    0 -1px 0 rgba(0, 0, 0, 0.04),
    0 2px 4px rgba(0, 0, 0, 0.25);
}

.google-sign-in-button:active {
  background-color: #eeeeee;
}

.google-sign-in-button:active {
  outline: none;
  box-shadow:
    0 -1px 0 rgba(0, 0, 0, 0.04),
    0 2px 4px rgba(0, 0, 0, 0.25),
    0 0 0 3px #c8dafc;
}

.google-sign-in-button:disabled {
  filter: grayscale(100%);
  background-color: #ebebeb;
  box-shadow:
    0 -1px 0 rgba(0, 0, 0, 0.04),
    0 1px 1px rgba(0, 0, 0, 0.25);
  cursor: not-allowed;
}
</style>
