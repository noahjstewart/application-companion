<template>
  <div class="home">
    <data-table
      :cols="tableHeaders"
      :rows="applications"
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
        'Applied At',
        'Notes',
        'Response?',
        'Interview?',
        'Offer?',
        'Accepted?'
      ]
    }
  },

  computed: {

    ...mapState({
      applications: state => state.applications
    })
    
  }
  
}
</script>
