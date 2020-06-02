import Vue from 'vue';
import VueRouter from 'vue-router';
import test1 from "../pages/test1";

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/test1',
            name: 'test1',
            component: test1
        }
    ]
})