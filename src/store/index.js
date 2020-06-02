import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const state= {//要设置的全局访问的state对象
    token: null,
    num: '0'
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})