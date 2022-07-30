<template>
  <div>
    <p>Admin Department List View</p>
    {{ allDepartments }}
    <t-modal v-model="isAddDepartmentModalOpened" header="Add Department">
      <Department-form @submit="addDepartment" @cancel="isAddDepartmentModalOpened = false" />
    </t-modal>
    <t-modal v-model="isUpdateModalOpened" header="Update Department">
      <update-department-form
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
    <div class="max-w-7xl flex justify-between mx-auto px-4 sm:px-6 md:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">Department</h1>
      <t-button @click="isAddDepartmentModalOpened = true"> Add Department </t-button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import * as departmentTypes from "../../store/modules/departments/department-types";
import DepartmentForm from "../../components/departments/departmentForm.vue";
import ConfirmModal from "../../components/common/confirm-modal.vue";

export default {
  name: "AdminDepartment",
  components: {
    DepartmentForm,
    ConfirmModal,
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
      this.deleteDepartmentAction(this.selectedDepartment._id);
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
    openConfirmDeleteModal(id) {
      this.isConfirmModalOpened = true;
      this.selectedDepartment = this.allDepartments.find((item) => item._id === id);
      this.deleteMessage = `Are you sure you want to delete Department title "${this.selectedDepartment.name}" ?`;
    },
  },
};
</script>
