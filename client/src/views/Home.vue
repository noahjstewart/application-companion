<template>
  <div class="home">
    <button class="btn-add-application">Add Application</button>
    <h1>Application Companion</h1>
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
.btn-add-application {
  float: right;
}
</style>