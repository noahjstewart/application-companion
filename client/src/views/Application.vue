<template>
  <div class="application-container" v-if="!applicationLoading">
    <div class="application-view" v-if="!editing">
      {{ application.company }}
      {{ application.position }}
      <custom-button 
        msg="Edit Application"
        @btnClicked="editApplication">
        <span slot="icon"><i class="fa fa-pencil" aria-hidden="true"></i></span>
      </custom-button>
    </div>
    <div class="edit-view" v-else>
      <application-form
        :editing="editing"
        :application="applicationClone"
        @onSubmit="onSubmit" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Button from '@/components/user_interface/Button.vue';
import ApplicationForm from '@/components/ApplicationForm.vue';

export default {

  components: {
    'custom-button': Button,
    'application-form': ApplicationForm
  },

  data() {
    return {
      loading: false,
      editing: false,
      applicationClone: {}
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
    
  },

  methods: {

    ...mapActions({
      updateApplication: 'updateApplication'
    }),

    editApplication() {
      this.applicationClone = JSON.parse(JSON.stringify(this.application));
      this.applicationClone = {
        company: this.applicationClone.company,
        position: this.applicationClone.position,
        listing_url: this.applicationClone.listing_url,
        applied_at: this.applicationClone.applied_at,
        notes: this.applicationClone.notes,
        response: this.applicationClone.response,
        interview: this.applicationClone.interview,
        offer: this.applicationClone.offer,
        accepted: this.applicationClone.accepted
      }
      this.editing = true;
    },

    onSubmit(form) {
      this.loading = true;
      form.id = this.$route.params.id;
      this.updateApplication(form)
        .then(res => this.editing = false )
        .catch(e => alert(e.message))
        .finally(() => { this.loading = false });
    }
    
  }

}
</script>

<style scoped>
.application-container {
  margin-top: 20px;
}
</style>