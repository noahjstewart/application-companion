<template>
  <div class="data-table">
    <table v-if="rows.length">
      <tr>
        <th v-for="(col, index) in cols" :key="index">{{ col }}</th>
      </tr>
      <tr v-for="(row, index) in rows" :key="index">
        <td>{{ row.company }}</td>
        <td>{{ row.position }}</td>
        <td>{{ row.listing_url }}</td>
        <td>{{ row.applied_at }}</td>
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
table, th, td {
  border: 1px solid #232931;
  border-collapse: collapse;
  text-align: left;
}

table {
  width: 100%;
  background-color: #eeeeee;
  box-shadow: 0px 10px 18px -7px black;
}

th {
  color: #232931
}

td {
  color: #393e46;
}
</style>