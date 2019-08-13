<template>
  <div class="home">
    <div class="home-header">
      <h1>Application Companion</h1>
      <button class="btn-add-application">Add Application</button>
    </div>
    <data-table
      :rows="applicationRows"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import DataTable from '@/components/DataTable.vue';
import { mapState } from 'vuex';

export default {

 components: {
   'data-table': DataTable
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

  watch: {
    
    applications() {
      this.applicationRows = JSON.parse(JSON.stringify(this.applications));
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