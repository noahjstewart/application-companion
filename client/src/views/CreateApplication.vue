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
      this.saving = true;
      if (form.applied_at === null) form.applied_at = undefined;
      this.$http.post('http://localhost:5000/api/applications', {
        ...form
      })
      .then(res => {
        this.addApplication({
          application: res.data
        });
        this.$router.push({ name: 'application-view', params: { id: res.data._id } });
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