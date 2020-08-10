import Vue from 'vue'

Vue.component('election-cluster', require('./ElectionCluster').default);
Vue.component('election-input', require('./ElectionInput').default);
Vue.component('election-component', require('./ElectionComponent').default);
Vue.component('election-legend', require('./ElectionLegend').default);
Vue.component('election-event', require('./ElectionEvent').default);
Vue.component('election-event-log', require('./ElectionEventLog').default);
//Vue.component('algorithm-description', require('./AlgorithmDescription').default);
Vue.component('bully-description', require('./algorithmDetails/bully/BullyDescription').default);
require("./algorithmDetails")