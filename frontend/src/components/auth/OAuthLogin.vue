<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import request from "@/stores/request";
const router = useRouter();
const route = useRoute();

function eraseCookie(name: String) {
    document.cookie = name + "=; Max-Age=0";
}

onMounted(async () => {
    let token = null;

    document.cookie.split(";").forEach((value) => {
        const c = value.split("token=");
        token = c[1];
    });

    // console.log('token', token)

    if (token) {
        localStorage.setItem("token", token);
        try {
            await request.get("/users/current", {
                headers: {
                    token: token,
                },
            });

            window.dispatchEvent(new CustomEvent("userLoggedIn")); // Dispatch the event

            // Clean cookie
            eraseCookie("token=");

            if (route.query && route.query.redirectTo) {
                // @ts-ignore
                router.push(route.query.redirectTo);
            } else {
                router.push("/");
            }
        } catch (error) {
            alert(error);
            localStorage.removeItem("token");
        }
    }
});
</script>

<template>
    <h1>Login in process......</h1>
</template>
