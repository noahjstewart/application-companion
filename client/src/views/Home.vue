<template>
  <div class="home">
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
      removeAllApplications: 'deleteAllApplications'
    }),

    setApplicationRows() {
      this.applicationRows = JSON.parse(JSON.stringify(this.applications));
    },

    viewApplication(appId) {
      this.$router.push({ name: 'application-view', params: { id: appId } });
    },

    deleteApplication(appId) {
      let conf = confirm("Are you sure you want to delete this application?");
      if (conf) {
        this.loading = true;
        this.removeApplication(appId)
          .then(res => this.loading = false)
          .catch(e => this.loading = false);
      }
    },

    deleteAllApplications() {
      let conf = confirm("Are you sure you want to delete all applications?");
      if (conf) {
        this.loading = true;
        this.removeAllApplications()
          .then(res => this.loading = false)
          .catch(e => this.loading = false);
      }
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