<template>
  <div class="data-table">
    <table v-if="rows.length">
      <tr>
        <th v-for="(col, index) in cols" :key="index">{{ col }}</th>
      </tr>
      <tr v-for="(row, index) in rows" :key="index">
        <td>{{ row.company }}</td>
        <td>{{ row.position }}</td>
        <td><a v-if="row.listing_url" :href="row.listing_url" target="_blank">Listing</a></td>
        <td>{{ row.applied_at | formatDate }}</td>
        <td>{{ row.notes }}</td>
        <td>{{ row.response }}</td>
        <td>{{ row.interview }}</td>
        <td>{{ row.offer }}</td>
        <td>{{ row.accepted }}</td>
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
    cols: {
      type: Array,
      required: true,
      default: []
    },
    rows: {
      type: Array,
      required: true,
      default: []
    }
  }
  
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  text-align: left;
}

table {
  width: 100%;
  background-color: #eeeeee;
  box-shadow: 0px 10px 18px -7px black;
}

th, td {
  padding: 2px 4px;
}

th {
  color: #232931;
  border-bottom: 1px solid #232931;
}

td {
  color: #393e46;
  border-bottom: 1px solid #c9d6df;
}

a {
  text-decoration: none;
}

a:visited {
  color: #393e46;
}

a:hover {
  color: #00adb5;
}

</style>