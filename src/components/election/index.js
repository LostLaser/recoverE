import Vue from 'vue'

Vue.component('election-cluster', require('./ElectionCluster').default);
Vue.component('election-input', require('./ElectionInput').default);
Vue.component('algorithm-description', require('./AlgorithmDescription').default);
Vue.component('election-component', require('./ElectionComponent').default);
Vue.component('election-legend', require('./ElectionLegend').default);