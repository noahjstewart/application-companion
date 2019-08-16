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
      let index = state.applications.findIndex(a => a._id === payload.appId);
      if (state.applications[index]) {
        Vue.set(state.applications, index, payload.application);
      }
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
          setTimeout(() => {
            commit('setApplications', {
              applications: res.data
            });
            resolve(state.applications);
          }, 1000);
        } catch(err) {
          reject(err)
        }
      });
    },

    createApplication({ commit }, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.post('http://localhost:5000/api/applications', payload);
          setTimeout(() => {
            commit('addApplication', {
              application: res.data
            });
            resolve(res.data);
          }, 1000);
        } catch (err) {
          reject(err)
        }
      });
    },

    deleteApplication({ commit }, appId) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.delete(`http://localhost:5000/api/applications/${appId}`);
          setTimeout(() => {
            commit('deleteApplication', {
              appId: appId
            });
            resolve(res.data);
          }, 1000);
        } catch (err) {
          reject(err)
        }
      });
    },
    
    deleteAllApplications({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.delete('http://localhost:5000/api/applications/delete/delete-all');
          setTimeout(() => {
            commit('deleteAllApplications');
            resolve(res.data);
          }, 1000);
        } catch (err) {
          reject(err)
        }
      });
    },

    updateApplicationField({ commit }, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          let reqPayload = {};
          reqPayload[payload.field] = payload.newValue;
          const res = await axios.put(`http://localhost:5000/api/applications/${payload.id}`, reqPayload);
          setTimeout(() => {
            commit('editApplication', {
              appId: payload.id,
              application: res.data
            });
            resolve(res.data);
          }, 1000);
        } catch (err) {
          reject(err)
        }
      });
    },

    updateApplication({ commit }, payload) {
      let id = payload.id;
      delete payload.id;
      return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.put(`http://localhost:5000/api/applications/${id}`, payload);
          setTimeout(() => {
            commit('editApplication', {
              appId: id,
              application: res.data
            });
            resolve(res.data);
          }, 1000);
        } catch (err) {
          reject(err)
        }
      });
    }
    
  }
})
