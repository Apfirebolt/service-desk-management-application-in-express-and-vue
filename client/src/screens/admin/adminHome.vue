<template>
  <div>
    <p class="text-3xl text-center">Admin View</p>
    {{ profileData }}
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import * as authTypes from '../../store/modules/auth/auth-types';

export default {
  name: 'AdminHome',
  computed: {
    ...mapGetters({
      profileData: authTypes.GET_PROFILE_DATA,
    }),
  },
  mounted() {
    if (!this.profileData.isAdmin) {
      this.$router.push({ name: 'Login' })
    }
  },
  data() {
    return {
     
    };
  },
};
</script>
