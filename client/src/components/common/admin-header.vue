<template>
  <div class="grid grid-cols-2 bg-gray-100 p-2 gap-x-6 gap-y-4 sm:gap-8 sm:my-4">
    <div>
      <p class="my-3">
        Welcome to the admin panel, <span class="text-2xl text-red-500">{{ username }}</span>
      </p>
      <p class="my-3">
        As an admin you have the privilege to create, update, delete departments. You can also
        remove added users and change the status of the registered complaints.
      </p>
    </div>
    <div>
      <router-link
        :to="{ name: 'AdminUsers' }"
        class="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Users
      </router-link>
      <router-link
        :to="{ name: 'AdminComplaints' }"
        class="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Complaints
      </router-link>
      <router-link
        :to="{ name: 'AdminDepartments' }"
        class="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Departments
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import * as authTypes from "../../store/modules/auth/auth-types";

export default {
  name: "AdminHeaderComponent",
  computed: {
    ...mapGetters({
      profileData: authTypes.GET_PROFILE_DATA,
    }),
    username() {
      if (this.profileData) {
        return this.profileData.firstName + " " + this.profileData.lastName;
      }
    },
  },
  mounted() {
    if (!this.profileData.isAdmin) {
      this.$router.push({ name: "Login" });
    }
  },
};
</script>
