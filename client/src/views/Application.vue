<template>
  <div class="application-container">
    <div class="error-message" v-if="error">{{ error }}</div>
    {{ application.company }}
    {{ application.position }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {

  data() {
    return {
      application: {},
      error: ''
    }
  },

  computed: {

    ...mapGetters({
      getApplication: 'getApplicationById'
    })
    
  },

  created() {
    this.application = this.getApplication(this.$route.params.id);
    if (!this.application) this.error = "Application does not exist";
  },

  watch: {
    $route() {
      this.application = this.getApplication(this.$route.params.id);
      if (!this.application) this.error = "Application does not exist";ß
    }
  }
  
}
</script>