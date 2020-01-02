import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: null,
        products: [
            {id:0, name: 'poulet',expiration_date: "01/01/20", image: 'https://cdn.pratico-pratiques.com/app/uploads/sites/2/2019/04/23104327/poulet-barbecue-sur-canette-de-biere.jpg'},
            {id:1, name: 'poulet', image: 'https://cdn.pratico-pratiques.com/app/uploads/sites/2/2019/04/23104327/poulet-barbecue-sur-canette-de-biere.jpg'},
            {id:2, name: 'poulet', image: 'https://cdn.pratico-pratiques.com/app/uploads/sites/2/2019/04/23104327/poulet-barbecue-sur-canette-de-biere.jpg'},
            {id:3, name: 'poulet', image: 'https://cdn.pratico-pratiques.com/app/uploads/sites/2/2019/04/23104327/poulet-barbecue-sur-canette-de-biere.jpg'},
            {id:4, name: 'poulet', image: 'https://cdn.pratico-pratiques.com/app/uploads/sites/2/2019/04/23104327/poulet-barbecue-sur-canette-de-biere.jpg'},
            {id:5, name: 'poulet', image: 'https://cdn.pratico-pratiques.com/app/uploads/sites/2/2019/04/23104327/poulet-barbecue-sur-canette-de-biere.jpg'}
        ]
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