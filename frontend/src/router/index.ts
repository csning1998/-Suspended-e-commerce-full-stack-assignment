import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegistrationView from "@/views/RegistrationView.vue";
import UserProfileView from "@/views/UserProfileView.vue";
import PrivacyPolicy from "@/views/PrivacyPolicy.vue";
import TermsOfService from "@/views/TermsofService.vue";
import ProductListView from "@/views/ProductListView.vue";
import ProductDetailView from "@/views/ProductDetailView.vue";
// import TestComponents from "@/components/TestComponents.vue";
import SellerProductManagementView from "@/views/SellerProductManagementView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/login",
            name: "login",
            component: LoginView,
        },
        {
            path: "/register",
            name: "register",
            component: RegistrationView,
        },
        {
            path: "/profile",
            name: "profile",
            component: UserProfileView,
        },
        {
            path: "/privacy-policy",
            name: "PrivacyPolicy",
            component: PrivacyPolicy,
        },
        {
            path: "/terms-of-service",
            name: "TermsOfService",
            component: TermsOfService,
        },

        {
            path: "/products",
            name: "ProductList",
            component: ProductListView,
        },
        {
            path: "/productDetailView",
            name: "ProductDetailView",
            component: ProductDetailView,
            props: true,
        },
        {
            path: "/seller-product-management",
            name: "SellerProductManagementView",
            component: SellerProductManagementView,
        },
    ],
});

export default router;
