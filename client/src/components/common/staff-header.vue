<template>
  <div v-if="profileData" class="grid grid-cols-2 bg-gray-100 p-2 gap-x-6 gap-y-4 sm:gap-8 sm:my-4">
    <div>
      <p class="my-3">
        Welcome to the staff panel, <span class="text-2xl text-red-500">{{ username }}</span>
      </p>
      <p class="my-3">
        You would be able to view the complaints assigned to you and update status of these complaints
      </p>
    </div>
    <div class="grid grid-cols-2 md:flex md:justify-center md:items-center">
      <router-link
        :to="{ name: 'Dashboard' }"
        class="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Dashboard
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import * as authTypes from "../../store/modules/auth/auth-types";

export default {
  name: "StaffHeaderComponent",
  computed: {
    ...mapGetters({
      profileData: authTypes.GET_PROFILE_DATA,
    }),
    username() {
      if (this.profileData) {
        return this.profileData.firstName + " " + this.profileData.lastName;
      }
      return ''
    },
  },
  mounted() {
    if (this.profileData && (!this.profileData.isAdmin && this.profileData.userType !== 'staff')) {
      this.$router.push({ name: "Login" });
    }
  },
};
</script>
