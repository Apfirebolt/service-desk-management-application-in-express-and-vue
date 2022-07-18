import Vue from 'vue';


Vue.filter('toUpperCase', (value) => {
  if (!value) return '';
  return value.toUpperCase();
});
