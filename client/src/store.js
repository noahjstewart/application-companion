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

    },

    deleteApplication(state, payload) {
      let index = state.applications.findIndex(a => a._id === payload.appId);
      if (state.applications[index]) {
        state.applications.splice(index, 1);
      }
    },

    deleteAllApplications(state) {
      state.applications = [];
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
    },

    deleteApplication({ commit }, appId) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.delete(`http://localhost:5000/api/applications/${appId}`);
          commit('deleteApplication', {
            appId: appId
          });
          resolve(res.data);
        } catch (err) {
          reject(err)
        }
      });
    },
    
    deleteAllApplications({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.delete('http://localhost:5000/api/applications/delete/delete-all');
          commit('deleteAllApplications');
          resolve(res.data);
        } catch (err) {
          reject(err)
        }
      });
    },
    
  }
})
