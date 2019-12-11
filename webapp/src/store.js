import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: null
    },
    getters: {
        user (state) {
            return (state.user);
        }
    },
    mutations: {
        setUser (state, user) {
            state.user = user;
        }
    },
    actions: {
        loadCurrentSession (state) {
            axios.get('/api/user/current-session').then((userInfo) => {
                state.commit("setUser", userInfo.data);
            }).catch(() => {
                state.commit("setUser", null);
            })
        }
    }
});

export default store;