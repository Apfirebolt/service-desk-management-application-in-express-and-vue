<template>
  <div>
    <p>Admin User List View</p>
    {{ allUsers }}
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import * as userTypes from "../../store/modules/auth/auth-types";

export default {
  name: "AdminUser",
  data() {
    return {
      urlParams: {
        page: 1,
        limit: 5,
      },
    };
  },
  computed: {
    ...mapGetters({
      allUsers: userTypes.GET_ALL_USERS,
    }),
  },
  watch: {
    $route() {
      this.getAllUsers(this.urlParams);
    },
    urlParams: {
      handler: "updateRoute",
      deep: true,
    },
  },
  mounted() {
    this.getAllUsers(this.urlParams);
  },
  methods: {
    ...mapActions({
      getAllUsers: userTypes.GET_ALL_USERS_ACTION,
    }),
    async updateRoute() {
      try {
        await this.$router.push({ name: "AdminUser", query: this.urlParams });
      } catch (navigationError) {
        // Catch and ignore navigation errors caused through multiple params changed
      }
    },
  },
};
</script>
