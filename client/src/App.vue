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
/* color palettes: 
current = https://colorhunt.co/palette/117601

https://colorhunt.co/palette/10792
https://colorhunt.co/palette/118962
https://colorhunt.co/palette/150168 
https://colorhunt.co/palette/1649 (grayscale)
*/

body {
  height: 100%;
  width: 100%;
  background-color: #232931;
  font-family: 'Lato', sans-serif;
}

#app {
  padding: 4vh 10vw;
  color: #eeeeee;
}

.error-message {
  margin: 0 auto;
  background-color: #ff6768;
  text-align: center;
  padding: 10px 30px;
  border-radius: 4px;
  width: 50%;
}
</style>
