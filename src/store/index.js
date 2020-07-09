import Vue from "vue";
import Vuex from "vuex";
 
Vue.use(Vuex);
 
export default new Vuex.Store({
    state: {
        eventLog: []
    },
    mutations: {
        addEvent (state, payload) {
            state.eventLog.unshift(payload.event);
            while (state.eventLog.length > 10) {
                state.eventLog.pop();
            }
        }
    }
});
