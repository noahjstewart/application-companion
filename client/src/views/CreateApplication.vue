<template>
  <div class="add-application">
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
          this.$router.push({ name: 'application-view', params: { id: res._id } });
        })
        .catch(e => console.log(e))
        .finally(() => { this.saving = false; });
    }
    
  }
  
}
</script>