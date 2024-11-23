<script setup lang="ts">
import { defineProps, ref } from "vue";
const props = defineProps<{
  registrationFormData: RegistrationFormData;
  onSubmit: () => void;
}>();

// const formDirection = ref('horizontal')
</script>

<template>
  <div class="form-container">
    <!-- <label>
      <input type="radio" v-model="formDirection" value="horizontal" />
      horizontal
    </label>
    <label>
      <input type="radio" v-model="formDirection" value="vertical" />
      vertical
    </label> -->
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
        <!-- <div class="form-field">
            <div class="form-item">
              <label class="form-field label" for="userEmail"
                >Family Name</label
              >
              <input
                id="userFamilyName"
                type="text"
                v-model="registrationFormData.userFamilyName"
                required
              />
              <label class="form-field label" for="userEmail">Given Name</label>
              <input
                id="userGivenName"
                type="text"
                v-model="registrationFormData.userGivenName"
                required
              />
            </div>
          </div> -->
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

        <!-- <div class="form-field">
            <div class="form-item">
              <label class="label">&nbsp;aaa</label>
              <button class="form-button" type="submit">Register</button>
            </div>
          </div> -->

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
