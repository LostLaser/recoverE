import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;//if no js file name occurs then it will look for index.js.
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
require('./components/election');
require('./components/base');
require('./store');

// ######### Default Configuration ##########
Vue.prototype.$apiUrl = "ws://localhost:8888"

// Set production properties 
if (process.env.NODE_ENV == "production") {
  Vue.prototype.$apiUrl = "wss://stormy-gorge-22823.herokuapp.com"
}

new Vue({
  render: h => h(App),
}).$mount('#app');




// 