import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: null,
        products: []
    },
    getters: {
        products (state) {
            return (state.products);
        },
        user (state) {
            return (state.user);
        }
    },
    mutations: {
        setUser (state, user) {
            state.user = user;
        },
        setProducts (state, products) {
            state.products = products;
        }
    },
    actions: {
        loadCurrentSession ({ commit }) {
            axios.get('/api/user/current-session').then((userInfo) => {
                commit("setUser", userInfo.data);
            }).catch(() => {
                commit("setUser", null);
            })
        },
        loadProducts ({ commit }) {
            axios.get('/api/products/').then((products) => {
                commit("setProducts", products.data);
            }).catch(() => {
                commit("setProducts", null);
            })
        },
    }
});

export default store;