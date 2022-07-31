<template>
  <div class="w-3/4 py-3 mx-auto">
    <admin-header-component />
    <t-modal v-model="isAddDepartmentModalOpened" header="Add Department">
      <department-form @submit="addDepartment" @cancel="isAddDepartmentModalOpened = false" />
    </t-modal>
    <t-modal v-model="isUpdateModalOpened" header="Update Department">
      <department-form
        :department="selectedDepartment"
        @updateDepartment="updateDepartment"
        @cancel="isUpdateModalOpened = false"
      />
    </t-modal>
    <t-modal v-model="isConfirmModalOpened" header="Confirm Delete">
      <confirm-modal
        :message="deleteMessage"
        @confirm="deleteDepartment"
        @cancel="isConfirmModalOpened = false"
      />
    </t-modal>
    <div class="max-w-7xl my-3 flex justify-between mx-auto">
      <h1 class="text-2xl font-semibold text-gray-900">
        Department
      </h1>
      <t-button @click="isAddDepartmentModalOpened = true">
        Add Department
      </t-button>
    </div>
  
    <div class="max-w-7xl flex justify-between mx-auto">
      <t-table
        :headers="['Name', 'Description', 'Actions']"
        :data="allDepartments"
        class="bg-white shadow-sm"
      >
        <template slot="row" slot-scope="props">
          <tr>
            <td class="p-3">
              {{ props.row.name }}
            </td>
            <td class="p-3">
              {{ props.row.description }}
            </td>
            <td class="p-3">
              <button
                type="button"
                class="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                @click="openConfirmDeleteModal(props.row.name)"
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
              <button
                type="button"
                class="hidden sm:inline-flex relative items-center mx-2 px-4 py-2 rounded-md border border-gray-300 bg-blue-200 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                @click="openUpdateDepartmentModal(props.row._id)"
              >
                <svg
                  class="mr-2.5 h-5 w-5 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                <span>Edit</span>
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
import * as departmentTypes from "../../store/modules/departments/department-types";
import DepartmentForm from "../../components/departments/departmentForm.vue";
import ConfirmModal from "../../components/common/confirm-modal.vue";
import AdminHeaderComponent from '../../components/common/admin-header.vue';

export default {
  name: "AdminDepartment",
  components: {
    DepartmentForm,
    ConfirmModal,
    AdminHeaderComponent
  },
  data() {
    return {
      isAddDepartmentModalOpened: false,
      showSidebar: true,
      isConfirmModalOpened: false,
      isUpdateModalOpened: false,
      selectedDepartment: null,
      deleteMessage: "",
      urlParams: {
        page: 1,
        limit: 5,
      },
    };
  },
  computed: {
    ...mapGetters({
      allDepartments: departmentTypes.GET_ALL_DEPARTMENTS,
      departmentCount: departmentTypes.GET_DEPARTMENT_COUNT,
    }),
  },
  watch: {
    $route() {
      this.getAllDepartments(this.urlParams);
    },
    urlParams: {
      handler: "updateRoute",
      deep: true,
    },
  },
  mounted() {
    this.getAllDepartments(this.urlParams);
  },
  methods: {
    ...mapActions({
      addDepartmentAction: departmentTypes.CREATE_DEPARTMENT_ACTION,
      updateDepartmentAction: departmentTypes.UPDATE_DEPARTMENT_ACTION,
      deleteDepartmentAction: departmentTypes.DELETE_DEPARTMENT_ACTION,
      getAllDepartments: departmentTypes.GET_ALL_DEPARTMENTS_ACTION,
    }),
    async updateRoute() {
      try {
        await this.$router.push({ name: "AdminDepartment", query: this.urlParams });
      } catch (navigationError) {
        // Catch and ignore navigation errors caused through multiple params changed
      }
    },
    addDepartment(payload) {
      const formattedPayload = {
        name: payload.name,
        description: payload.description,
      };
      this.addDepartmentAction(formattedPayload);
      this.isAddDepartmentModalOpened = false;
      this.getAllDepartments();
    },
    closeSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    deleteDepartment() {
      this.isConfirmModalOpened = false;
      this.deleteDepartmentAction(this.selectedDepartment.name);
      this.getAllDepartments();
    },
    openUpdateDepartmentModal(id) {
      this.isUpdateModalOpened = true;
      this.selectedDepartment = this.allDepartments.find((item) => item._id === id);
    },
    updateDepartment() {
      this.isUpdateModalOpened = false;
      this.updateDepartmentAction(this.selectedDepartment);
      this.getAllDepartments();
    },
    openConfirmDeleteModal(name) {
      this.isConfirmModalOpened = true;
      this.selectedDepartment = this.allDepartments.find((item) => item.name === name);
      this.deleteMessage = `Are you sure you want to delete Department title "${this.selectedDepartment.name}" ?`;
    },
  },
};
</script>
