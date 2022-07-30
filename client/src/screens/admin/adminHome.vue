<template>
  <div class="mx-auto py-3 w-3/4">
    <p class="my-3">
      Welcome to the admin panel, <span class="text-2xl text-red-500">{{ username }}</span>
    </p>
    <p class="my-3">
      As an admin you have the privilege to create, update, delete departments. You can also remove added users and change the status
      of the registered complaints.
    </p>
    <admin-header-component />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import * as authTypes from '../../store/modules/auth/auth-types';
import AdminHeaderComponent from '../../components/common/admin-header.vue';

export default {
  name: 'AdminHome',
  components: {
    AdminHeaderComponent
  },
  computed: {
    ...mapGetters({
      profileData: authTypes.GET_PROFILE_DATA,
    }),
    username() {
      if (this.profileData) {
        return this.profileData.firstName + ' ' + this.profileData.lastName;
      }
    }
  },
  mounted() {
    if (!this.profileData.isAdmin) {
      this.$router.push({ name: 'Login' })
    }
  },
};
</script>
