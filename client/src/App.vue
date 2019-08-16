<template>
  <div id="app">
    <loading
      :active="loading"
      loader="dots"
      background-color="#eeeeee"
      color="#232931"
      :opacity="0.7"
      :z-index="5001"/>
    <notifications group="app" position="top center" classes="app-notification" :duration="2500"/>
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

.vue-notification-template.app-notification {
  padding: 15px;
  color: #eeeeee;
  font-size: 14px;
  text-align: center;
  border-radius: 3px;
  margin: 4px 4px;
}

.app-notification.success {
  background: #4ecca3;
}

.app-notification.error {
  background: #ff6768;
}

.error-message {
  margin: 0 auto;
  background-color: #ff6768;
  text-align: center;
  padding: 10px 30px;
  border-radius: 4px;
  width: 50%;
}

.red {
  color: #ff6768;
}

.sm-text {
  font-size: .75rem;
  margin: 0;
}

.margin-t0 {
  margin-top: 0 !important;
}

.margin-b0 {
  margin-bottom: 0 !important;
}

.bold {
  font-weight: bold;
}

.light-back-with-shadow {
  background-color: #eeeeee;
  color: #393e46;
  box-shadow: 0px 10px 18px -7px black;
}

.rounded {
  border-radius: 4px;
}

.padded {
  padding: 2vh 4vw;
}

@media (max-width: 767px) {
  h1 {
    font-size: 24px;
  }
}

@media (max-width: 376px) {
  .vue-notification-template.app-notification {
    padding: 10px;
    margin: 4px 30px;
  }

}
</style>
