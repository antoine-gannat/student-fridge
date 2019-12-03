import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from './pages/HomePage';
import NotFound from './pages/404';

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        // Public routes
        {
            path: '/',
            name: 'Home page',
            component: HomePage
        },
        {
            path: "*",
            name: 'Page not found',
            component: NotFound
        }
    ]
});