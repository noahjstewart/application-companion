<template>
  <div class="home">
    <loading
      :active="loading"
      loader="dots"
      background-color="#eeeeee"
      color="#232931"
      :opacity="0.7"
      :z-index="5001"/>
    <div class="home-header">
      <h1>Application Companion</h1>
      <router-link :to="{ name: 'create-application' }">
        <custom-button
          msg="Add Application">
          <span slot="icon"><i class="fa fa-plus" aria-hidden="true"></i></span>
        </custom-button>
      </router-link>
    </div>
    <data-table
      :rows="applicationRows"
      @goToRow="viewApplication"
      @deleteApplication="deleteApplication"
      @deleteAll="deleteAllApplications"
      @updateApplication="updateApplicationField"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import DataTable from '@/components/DataTable.vue';
import Button from '@/components/user_interface/Button.vue';
import { mapState, mapActions } from 'vuex';

export default {

 components: {
   'data-table': DataTable,
   'custom-button': Button
 }, 

  data() {
    return {
      loading: false,
      applicationRows: []
    }
  },

  computed: {

    ...mapState({
      applications: state => state.applications
    })
    
  },

  created() {
    this.setApplicationRows();
  },

  methods: {

    ...mapActions({
      removeApplication: 'deleteApplication',
      removeAllApplications: 'deleteAllApplications',
      editApplicationField: 'updateApplicationField'
    }),

    setApplicationRows() {
      let rows = JSON.parse(JSON.stringify(this.applications));
      this.applicationRows = rows.sort((row1, row2) => (new Date(row1.applied_at) < new Date(row2.applied_at)) ? 1 : -1);
    },

    viewApplication(appId) {
      this.$router.push({ name: 'application-view', params: { id: appId } });
    },

    deleteApplication(appId) {
      let conf = confirm("Are you sure you want to delete this application?");
      if (conf) {
        this.loading = true;
        this.removeApplication(appId)
          .then(() => {
            this.$notify({
              group: 'app',
              type: 'success',
              text: 'Application deleted',
            });
          })
          .catch(err => {
            this.$notify({
              group: 'app',
              type: 'error',
              text: `Failed to delete application: ${err.message}`,
            });
          })
          .finally(() => this.loading = false);
      }
    },

    deleteAllApplications() {
      let conf = confirm("Are you sure you want to delete all applications?");
      if (conf) {
        this.loading = true;
        this.removeAllApplications()
          .then(() => {
            this.$notify({
              group: 'app',
              type: 'success',
              text: 'Applications deleted',
            });
          })
          .catch(err => {
            this.$notify({
              group: 'app',
              type: 'error',
              text: `Failed to delete applications: ${err.message}`,
            });
          })
          .finally(() => this.loading = false);
      }
    },

    updateApplicationField(payload) {
      this.loading = true;
      this.editApplicationField(payload)
        .then(() => {
          this.$notify({
            group: 'app',
            type: 'success',
            text: 'Application saved!',
          });
        })
        .catch(err => {
          this.$notify({
            group: 'app',
            type: 'error',
            text: `Failed to delete application: ${err.message}`,
          });
        })
        .finally(() => this.loading = false);
    }
    
  },

  watch: {
    
    applications() {
      this.setApplicationRows();
    }

  }
  
}
</script>

<style scoped>
.home-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 767px) {
  .home-header {
    margin-bottom: 20px;
  }
}
</style>