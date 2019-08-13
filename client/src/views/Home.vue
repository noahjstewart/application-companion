<template>
  <div class="home">
    <div class="home-header">
      <h1>Application Companion</h1>
      <button class="btn-add-application">Add Application</button>
    </div>
    <data-table
      :cols="tableHeaders"
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
      tableHeaders: [
        'Company',
        'Position',
        'Listing URL',
        'Applied',
        'Notes',
        'Response?',
        'Interview?',
        'Offer?',
        'Accepted?'
      ],
      applicationRows: []
    }
  },

  computed: {

    ...mapState({
      applications: state => state.applications
    })
    
  },

  mounted() {
    this.applicationRows = JSON.parse(JSON.stringify(this.applications));
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