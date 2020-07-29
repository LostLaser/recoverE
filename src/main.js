import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;//if no js file name occurs then it will look for index.js.
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
require('./components/election');
require('./components/base');
require('./store');

new Vue({
  render: h => h(App),
}).$mount('#app');
