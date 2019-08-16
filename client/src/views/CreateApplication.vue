<template>
  <div class="add-application">
    <loading
      :active="saving"
      loader="dots"
      background-color="#eeeeee"
      color="#232931"
      :opacity="0.7"
      :z-index="5001"/>
    <h1>Add Application</h1>
    <application-form 
      @onSubmit="onSubmit"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ApplicationForm from '@/components/ApplicationForm.vue';

export default {

  components: {
    'application-form': ApplicationForm
  },

  data() {
    return {
      saving: false
    }
  },

  methods: {

    ...mapActions({
      addApplication: 'createApplication'
    }),

    onSubmit(form) {
      this.saving = true;
      this.addApplication(form)
        .then(res => {
          this.$notify({
            group: 'app',
            type: 'success',
            text: 'Application created!',
          });
          this.$router.push({ name: 'application-view', params: { id: res._id } });
        })
        .catch(err => {
          this.$notify({
            group: 'app',
            type: 'error',
            text: `Failed to create application: ${err.message}`,
          });
        })
        .finally(() => { this.saving = false; });
    }
    
  }
  
}
</script>

<style scoped>
.add-application {
  position: relative;
}
</style>