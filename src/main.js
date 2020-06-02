import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import $http from './request/http';
import store from "./store";

Vue.config.productionTip = false;

Vue.prototype.$http = $http;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
