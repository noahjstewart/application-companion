<template>
  <div id="app">
    <div v-if="error" class="error-message">{{ error }}</div>
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import axios from 'axios';

export default {

  data() {
    return {
      loading: false,
      error: ''
    }
  },
  
  mounted() {
    this.loadApplications();
  },

  methods: {

    ...mapMutations({
      setApplications: 'setApplications'
    }),

    loadApplications() {
      this.loading = true;
      axios.get('http://localhost:5000/api/applications')
      .then(res => {
        this.setApplications({
          applications: res.data
        });
      })
      .catch(e => {
        this.error = 'Failed to load applications';
      })
      .finally(() => {
        this.loading = false;
      });
    }
    
  }
  
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  padding: 4vh 10vw;
}

.error-message {
  background-color: red;
}
</style>
