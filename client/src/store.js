import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    applications: []
  },
  mutations: {

    setApplications(state, payload) {
      state.applications = payload.applications;
    },

    addApplication(state, payload) {
      state.applications.push(payload.applications);
    },

    editApplication(state, payload) {

    }
    
  },
  actions: {

    loadApplications() {
      // use axios
    }
    
  }
})
