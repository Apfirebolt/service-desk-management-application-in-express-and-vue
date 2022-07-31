<template>
  <div class="w-3/4 py-3 mx-auto">
    <admin-header-component />
    <t-modal v-model="isConfirmModalOpened" header="Confirm Delete">
      <confirm-modal
        :message="deleteMessage"
        @confirm="deleteUser"
        @cancel="isConfirmModalOpened = false"
      />
    </t-modal>
    <div class="max-w-7xl my-3 flex justify-between mx-auto">
      <h1 class="text-2xl font-semibold text-gray-900">
        Users
      </h1>
    </div>
  
    <div class="max-w-7xl flex justify-between mx-auto">
      <t-table
        :headers="['Name', 'Email', 'Actions']"
        :data="allUsers"
        class="bg-white shadow-sm"
      >
        <template slot="row" slot-scope="props">
          <tr>
            <td class="p-3">
              {{ props.row.firstName + ' ' + props.row.lastName }}
            </td>
            <td class="p-3">
              {{ props.row.email }}
            </td>
            <td class="p-3">
              <button
                type="button"
                class="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                @click="openConfirmDeleteModal(props.row._id)"
              >
                <svg
                  class="mr-2.5 h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z"
                  />
                </svg>
                <span>Remove</span>
              </button>
            </td>
          </tr>
        </template>
      </t-table>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ConfirmModal from "../../components/common/confirm-modal.vue";
import AdminHeaderComponent from '../../components/common/admin-header.vue';
import * as userTypes from "../../store/modules/auth/auth-types";

export default {
  name: "AdminUser",
  components: {
    ConfirmModal,
    AdminHeaderComponent
  },
  data() {
    return {
      urlParams: {
        page: 1,
        limit: 5,
      },
      isConfirmModalOpened: false,
      selectedUser: null,
      deleteMessage: "",
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
      deleteUserAction: userTypes.DELETE_USER_ACTION
    }),
    async updateRoute() {
      try {
        await this.$router.push({ name: "AdminUser", query: this.urlParams });
      } catch (navigationError) {
        // Catch and ignore navigation errors caused through multiple params changed
      }
    },
    deleteUser() {
      this.isConfirmModalOpened = false;
      this.deleteUserAction(this.selectedUser._id);
      this.getAllUsers();
    },
    openConfirmDeleteModal(id) {
      this.isConfirmModalOpened = true;
      this.selectedUser = this.allUsers.find((item) => item._id === id);
      this.deleteMessage = `Are you sure you want to delete User with email "${this.selectedUser.email}" ?`;
    },
  },
};
</script>
