<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  
  mounted() {
    this.loadApplications().then
  },

  methods: {

    ...mapActions({
      loadApplications: 'loadApplications'
    })
    
  }
  
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  padding: 4vh 10vw;
}
</style>
