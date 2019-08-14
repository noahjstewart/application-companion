<template>
  <div id="app">
    <top-nav />
    <div v-if="error" class="error-message">{{ error }}</div>
    <router-view />
  </div>
</template>

<script>
import TopNav from '@/components/navigation/TopNav.vue';
import { mapActions } from 'vuex';

export default {

  components: {
    'top-nav': TopNav
  },

  data() {
    return {
      loading: false,
      error: ''
    }
  },
  
  mounted() {
    this.loading = true;
    this.loadApplications()
    .catch(err => { this.error = 'Failed to load applications' })
    .finally(() => { this.loading = false; });
  },

  methods: {

    ...mapActions({
      loadApplications: 'loadApplications'
    })

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

@media (max-width: 767px) {
  h1 {
    font-size: 24px;
  }
}
</style>
