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
    />
  </div>
</template>

<script>
// @ is an alias to /src
import DataTable from '@/components/DataTable.vue';
import Button from '@/components/user_interface/Button.vue';
import { mapState } from 'vuex';

export default {

 components: {
   'data-table': DataTable,
   'custom-button': Button
 }, 

  data() {
    return {
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

    setApplicationRows() {
      this.applicationRows = JSON.parse(JSON.stringify(this.applications));
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