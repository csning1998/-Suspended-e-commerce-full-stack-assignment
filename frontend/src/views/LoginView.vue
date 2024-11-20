<script setup lang="ts">
import request from "../stores/request";
import { ref } from "vue";
import { useRouter } from "vue-router";
import LoginForm from "@/components/auth/LoginForm.vue";

const loginFormData = ref<LoginFormData>({
  userName: "root",
  userPassword: "root",
});

const router = useRouter();

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
      userName: loginFormData.value.userName,
      userPassword: loginFormData.value.userPassword,
    });

    // // Save the token of login
    // localStorage.setItem("token", res.data.token);
    // // Set the token into default header.
    // request.defaults.headers.common["CommerceAuthToken"] = res.data.token;

    await router.push("/");
  } catch (error) {
    ajaxErrorHandler(error);
  }
}
</script>

<template>
  <LoginForm :loginFormData="loginFormData" :onSubmit="login" />
</template>

<style scoped></style>
