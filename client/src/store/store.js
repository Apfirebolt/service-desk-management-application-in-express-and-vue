import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth/auth';
import complaint from './modules/complaints/complaints';
import department from './modules/departments/departments';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    auth,
    complaint,
    department
  },
});
