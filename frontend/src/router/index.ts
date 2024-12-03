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
                allowRoles: ['admin', 'supplier', 'user']
            }
        },
        {
            path: "/seller-product-management",
            name: "SellerProductManagementView",
            component: SellerProductManagementView,
            meta: {
                require_login: true,
                allowRoles: ['admin', 'supplier']
            }
        },
    ],
});

/**
 * We
 */

import request from '@/stores/request'

import store from '@/stores/user'

router.beforeEach(async (to, from , next) => {
    console.log('from: ', from)
    console.log('to: ', to)

    if(localStorage.getItem('token') && store.currentUser == null) {
        try {
            const user = await request.get('/users/current')
            store.currentUser = user.data
        } catch (error) {
            alert(error)
        }
    }

    if(to.meta && to.meta.require_login === true) {
        const currentUser = store.currentUser
        // @ts-ignore
        if(to.meta.allowRoles.includes(currentUser.userPermission)){
            next()
        }
    }

    next()
})

export default router;
