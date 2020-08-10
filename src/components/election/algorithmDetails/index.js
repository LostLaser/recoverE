import Vue from 'vue'

Vue.component('bully-description', require('./bully/BullyDescription').default);
Vue.component('bully-complexity', require('./bully/BullyComplexity').default);
Vue.component('bully-overview', require('./bully/BullyOverview').default);
Vue.component('ring-description', require('./ring/RingDescription').default);
Vue.component('ring-complexity', require('./ring/RingComplexity').default);
Vue.component('ring-overview', require('./ring/RingOverview').default);
Vue.component('algorithm-description', require('./AlgorithmDescription').default);