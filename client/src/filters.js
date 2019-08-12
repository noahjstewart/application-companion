import Vue from 'vue'

Vue.filter('formatDate', function(value) {
  let date = new Date(value);
  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
});