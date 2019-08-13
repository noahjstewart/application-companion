<template>
  <div class="application-container" v-if="!applicationLoading">
    {{ application.company }}
    {{ application.position }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {

  data() {
    return {
    }
  },

  computed: {

    ...mapGetters({
      getApplication: 'getApplicationById'
    }),

    application() {
      return this.getApplication(this.$route.params.id);
    },

    applicationLoading() {
      return this.application === undefined || this.application === null;
    }
    
  }

}
</script>