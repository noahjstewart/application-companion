import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
  actions: {

    loadApplications({ commit, state }) {
      return new Promise( async (resolve, reject) => {
        try {
          const res = await axios.get('http://localhost:5000/api/applications');
          commit('setApplications', {
            applications: res.data
          });
          resolve(state.applications);
        } catch(err) {
          reject(err)
        }
      });
    }
    
  }
})
