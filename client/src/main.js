import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store.js';
import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap/dist/js/bootstrap.js';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
