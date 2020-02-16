import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: null,
        products: [],
        swRegistration: null
    },
    getters: {
        products (state) {
            return (state.products);
        },
        user (state) {
            return (state.user);
        },
        swRegistration (state){
            return (state.swRegistration);
        }
    },
    mutations: {
        setUser (state, user) {
            state.user = user;
        },
        setProducts (state, products) {
            state.products = products;
        },
        setSwRegistration(state, registration){
            state.swRegistration = registration;
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
        removeProduct ({ state }, productId) {
            let products = state.products;
            const index = products.findIndex((p) => p.id === productId)
            if (index < 0) {
                return
            }
            products.splice(index, 1)
            Vue.set(state, 'products', products)
        }
    }
});

export default store;