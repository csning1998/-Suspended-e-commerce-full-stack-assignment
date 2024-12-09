import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegistrationView from "@/views/RegistrationView.vue";
import UserProfileView from "@/views/UserProfileView.vue";
import PrivacyPolicy from "@/views/PrivacyPolicy.vue";
import TermsOfService from "@/views/TermsofService.vue";
import ProductListView from "@/views/ProductListView.vue";
import ProductDetailView from "@/views/ProductDetailView.vue";
import OauthLoginView from "@/components/auth/OAuthLogin.vue";
import TestComponents from "@/components/TestComponents.vue";
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
            path: "/oauth",
            name: "oauthLogin",
            component: OauthLoginView,
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
            path: "/profile",
            name: "profile",
            component: UserProfileView,
            meta: {
                require_login: true,
                allowRoles: ["admin", "supplier", "user"],
            },
        },
        {
            path: "/seller-product-management",
            name: "SellerProductManagementView",
            component: SellerProductManagementView,
            meta: {
                require_login: true,
                allowRoles: ["admin", "supplier"],
            },
        },
        {
            path: "/testComponents",
            name: "TestComponents",
            component: TestComponents,
        },
    ],
});

/**
 * We
 */

import request from "@/stores/request";

import store from "@/stores/user";

router.beforeEach(async (to, from, next) => {
    console.log("from: ", from);
    console.log("to: ", to);

    const token = localStorage.getItem("token");

    if (to.name == "login" && token) {
        console.log("!!!!!!!!!!!!!!!!!!!!!");
        console.log("HAVEN BEEN LOGGED IN");
        return next({ name: "home" });
    }

    if (token && store.currentUser == null) {
        try {
            const user = await request.get("/users/current");
            store.currentUser = user.data;
        } catch (error) {
            alert(error);
            localStorage.removeItem("token");
            store.currentUser = null;
            return next({ name: "login" });
        }
    }

    if (to.meta && to.meta.require_login === true) {
        const currentUser = store.currentUser;
        if (
            currentUser &&
            // @ts-ignore
            to.meta.allowRoles.includes(currentUser.userPermission)
        ) {
            return next();
        } else {
            return next({
                name: "login",
                query: {
                    redirectTo: to.fullPath,
                },
            });
        }
    }

    return next();
});

export default router;
