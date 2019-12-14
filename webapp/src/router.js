import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from './pages/HomePage';
import Auth from './pages/Auth';

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        // Public routes
        {
            path: '/',
            component: HomePage
        },
        {
            path: '/auth/:type',
            component: Auth
        }
    ]
});