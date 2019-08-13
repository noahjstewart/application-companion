<template>
  <div class="data-table">
    <table v-if="rows.length">
      <tr>
        <th v-for="(col, index) in cols" :key="index"
         :class="{ 'checkbox-col': [5,6,7,8].includes(index) }">{{ col }}</th>
      </tr>
      <tr v-for="(row, index) in rows" :key="index" @click="viewApplication(row._id)">
        <td>{{ row.company }}</td>
        <td>{{ row.position }}</td>
        <td><span v-if="row.listing_url" @click="visitListing(row.listing_url, $event)" class="listing-url">Listing</span></td>
        <td>{{ row.applied_at | formatDate }}</td>
        <td>{{ row.notes }}</td>
        <td class="checkbox-col"><input type="checkbox" v-model="row.response" @click="updateRow(row._id, $event)" /></td>
        <td class="checkbox-col"><input type="checkbox" v-model="row.interview" @click="updateRow(row._id, $event)" /></td>
        <td class="checkbox-col"><input type="checkbox" v-model="row.offer" @click="updateRow(row._id, $event)" /></td>
        <td class="checkbox-col"><input type="checkbox" v-model="row.accepted" @click="updateRow(row._id, $event)" /></td>
      </tr>
    </table>
    <div v-else class="error-message">
      No applications to show
    </div>
  </div>
</template>

<script>
export default {

  props: {
    rows: {
      type: Array,
      required: false,
      default: []
    }
  },

  data() {
    return {
      saving: false,
      cols: [
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
    }
  },

  methods: {

    viewApplication(appId) {
      alert(`view ${appId}`);
    },

    visitListing(url, e) {
      e.stopPropagation();
      window.open(url, "_blank");
    },

    updateRow(appId, e) {
      e.stopPropagation();
      this.saving = true;
      alert(`udpate ${appId}`);
      this.saving = false;
    }
    
  }
  
}
</script>

<style scoped>
.data-table {
  overflow-x: auto;
  box-shadow: 0px 10px 18px -7px black;
}

table {
  width: 100%;
  background-color: #eeeeee;
  border-collapse: collapse;
  text-align: left;
}

tr:hover {
  cursor: pointer;
  background-color: #c9d6df;
}

th, td {
  padding: 3px 6px;
}

th {
  color: #eeeeee;
  border-bottom: 1px solid #eeeeee;
  background-color: #393e46;
}

td {
  color: #393e46;
  border-bottom: 1px solid #c9d6df;
  white-space: nowrap;
}

.listing-url {
  text-decoration: none;
}

.listing-url:hover {
  color: #00adb5;
}

.checkbox-col {
  text-align: center;
}
</style>