<script setup lang="ts">
import request from "../stores/request";
import { ref } from "vue";
import { useRouter } from "vue-router";
import RegisterForm from "@/components/auth/RegisterForm.vue";

const registrationFormData = ref<RegistrationFormData>({
   userId: "root",
   userEmail: "nephew.UncleRoger@noreply.gmail.com",
   userFamilyName: "Uncle",
   userGivenName: "Roger",
   userPassword: "root",
   confirmPassword: "root",
});

const router = useRouter();

const ajaxErrorHandler = (error: any) => {
   if (error.response && error.response.data && error.response.data.message) {
      alert(error.response.data.message);
   } else {
      console.error("Error", error);
   }
};

async function register(): Promise<void> {
   try {
      const res = await request.post("/users/register", {
         userId: registrationFormData.value.userId,
         userEmail: registrationFormData.value.userEmail,
         userFamilyName: registrationFormData.value.userFamilyName,
         userGivenName: registrationFormData.value.userGivenName,
         userPassword: registrationFormData.value.userPassword,
         confirmPassword: registrationFormData.value.confirmPassword,
      });

      if (res.data.userPassword !== res.data.confirmPassword) {
         alert("Unmatched password. Please examine your password.");
      }

      await router.push("/login");
   } catch (error) {
      ajaxErrorHandler(error);
   }
}
</script>

<template>
   <RegisterForm
      :registrationFormData="registrationFormData"
      :onSubmit="register"
   />
</template>

<style scoped></style>
