import Vue from 'vue'

Vue.filter('formatDate', function(value) {
  let date = new Date(value);
  return `${date.getMonth()+1}/${date.getDate()+1}/${date.getFullYear()}`;
});