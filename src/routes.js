import Login from "./components/Login.vue";
import Dashboard from './Dashboard.vue';

import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Login",
        component: Login
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    // check if the user is trying to access a route other than login
    if (to.name !== 'Login') {
        // get the user data from session storage
        const userData = JSON.parse(sessionStorage.getItem('admin'));
        // check if the user data exists
        if (userData) {
            // if the user data exists, allow navigation unless accessing login page
            next();
        } else {
            // if the user data does not exist, redirect to login
            next({ name: 'Login' });
        }
    } else {
        // get the user data from session storage
        const userData = JSON.parse(sessionStorage.getItem('admin'));
        // check if the user data exists
        if (userData) {
            // if the user data exists and trying to access login page, redirect to dashboard
            next({ name: 'Dashboard' });
        } else {
            // if the user data does not exist, allow navigation to login page
            next();
        }
    }
});

export default router;