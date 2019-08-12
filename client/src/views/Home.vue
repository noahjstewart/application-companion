<template>
  <div class="home">
    <div v-for="app in applications" :key="app._id">
      {{ app._id }}: {{ app.company }} {{ app.position }}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapState } from 'vuex';

export default {

  data() {
    return {
    }
  },

  computed: {

    ...mapState({
      applications: state => state.applications
    })
    
  }
  
}
</script>
