<script setup lang="ts">
import request from "../stores/request";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import LoginForm from "@/components/auth/LoginForm.vue";

const loginFormData = ref<LoginFormData>({
   userId: "nephew.UncleRoger@noreply.gmail.com",
   userPassword: "root",
});

const router = useRouter();
const route = useRoute();

const ajaxErrorHandler = (error: any) => {
   if (error.response && error.response.data && error.response.data.message) {
      alert(error.response.data.message);
   } else {
      console.error("Error", error);
   }
};

async function login(): Promise<void> {
   try {
      const res = await request.post("/users/login", {
         userId: loginFormData.value.userId,
         userPassword: loginFormData.value.userPassword,
      });

      // Save the token of login
      localStorage.setItem("token", res.data.token);

      // Set the token into default header.
      request.defaults.headers.common["CommerceAuthToken"] = res.data.token;

      window.dispatchEvent(new CustomEvent("userLoggedIn")); // Dispatch the event

      alert("Login successfully");
      console.log("isLoggedIn", localStorage.getItem("isLoggedIn"));

      if (route.query && route.query.redirectTo) {
         // @ts-ignore
         await router.push(route.query.redirectTo);
      } else {
         await router.push("/");
      }
   } catch (error) {
      ajaxErrorHandler(error);
   }
}
</script>

<template>
   <LoginForm :loginFormData="loginFormData" :onSubmit="login" />
</template>

<style scoped></style>
