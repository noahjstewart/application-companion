<template>
  <div class="add-application">
    <h1>Add Application</h1>
    <application-form 
      @onSubmit="onSubmit"/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
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

    ...mapMutations({
      addApplication: 'addApplication'
    }),

    onSubmit(form) {
      console.log(form);
      this.saving = true;
      this.$http.post('http://localhost:5000/api/applications', {
        ...form
      })
      .then(res => {
        this.addApplication({
          application: form
        });
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        this.saving = false;
      });
    }
    
  }
  
}
</script>