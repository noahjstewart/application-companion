import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    applications: []
  },
  getters: {

    getApplicationById: (state) => (id) => {
      return state.applications.find(app => app._id === id);
    }
    
  },
  mutations: {

    setApplications(state, payload) {
      state.applications = payload.applications;
    },

    addApplication(state, payload) {
      state.applications.unshift(payload.application);
    },

    editApplication(state, payload) {

    }
    
  },
  // actions: {

  //   loadApplications({ commit }) {
      
  //   }
    
  // }
})
