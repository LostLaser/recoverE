import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;//if no js file name occurs then it will look for index.js.
require('./components/news');
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'material-icons/iconfont/material-icons.css';
import './App.css'

new Vue({
  render: h => h(App),
}).$mount('#app');