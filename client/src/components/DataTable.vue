<template>
  <div>
    <div class="data-table" v-if="rows.length">
      <table v-if="rows.length">
        <tr>
          <th class="delete" @click="deleteAll"><i class="fa fa-times" aria-hidden="true"></i></th>
          <th v-for="(col, index) in cols" :key="index"
          :class="{ 'checkbox-col': [5,6,7,8].includes(index) }">{{ col }}</th>
        </tr>
        <tr v-for="(row, index) in rows" :key="index" @click="rowClicked(row._id)">
          <td class="delete" @click="deleteApplication(row._id, $event)"><i class="fa fa-trash-o" aria-hidden="true"></i></td>
          <td>{{ row.company }}</td>
          <td>{{ row.position }}</td>
          <td><span v-if="row.listing_url" @click="visitListing(row.listing_url, $event)" class="listing-url">Listing</span></td>
          <td>{{ row.applied_at | formatDate }}</td>
          <td class="notes-cell">{{ row.notes }}</td>
          <td :class="{ 'checkbox-col': true, 'checked': row.response, 'unchecked': !row.response }">
            <input type="checkbox" name="response" v-model="row.response" @click="updateApplication(row._id, $event)" />
          </td>
          <td :class="{ 'checkbox-col': true, 'checked': row.interview, 'unchecked': !row.interview }">
            <input type="checkbox" name="interview" v-model="row.interview" @click="updateApplication(row._id, $event)" />
          </td>
          <td :class="{ 'checkbox-col': true, 'checked': row.offer, 'unchecked': !row.offer }">
            <input type="checkbox" name="offer" v-model="row.offer" @click="updateApplication(row._id, $event)" />
          </td>
          <td :class="{ 'checkbox-col': true, 'checked': row.accepted, 'unchecked': !row.accepted }">
            <input type="checkbox" name="accepted" v-model="row.accepted" @click="updateApplication(row._id, $event)" />
          </td>
        </tr>
      </table>
    </div>
    <div v-else class="error-message">
      No data to display
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

    rowClicked(appId) {
      this.$emit('goToRow', appId);
    },

    visitListing(url, e) {
      e.stopPropagation();
      window.open(url, "_blank");
    },

    updateApplication(appId, e) {
      e.stopPropagation();
      this.$emit('updateApplication', {
        id: appId,
        field: e.target.name,
        newValue: e.target.checked
      });
    },

    deleteApplication(appId, e) {
      e.stopPropagation();
      this.$emit('deleteApplication', appId);
    },

    deleteAll() {
      this.saving = true;
      this.$emit('deleteAll');
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

.delete {
  text-align: center;
  color: #ff6768;
}

.listing-url {
  text-decoration: none;
}

.listing-url:hover {
  color: #00adb5;
}

.notes-cell {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.checkbox-col {
  text-align: center;
}

.checked {
  background-color: #4ecca27e;
}

.unchecked {
  background-color: #ff6767b0;
}
</style>