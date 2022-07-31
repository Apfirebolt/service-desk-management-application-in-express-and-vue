<template>
  <div class="w-3/4 py-3 mx-auto">
    <admin-header-component />
    <t-modal v-model="isAddComplaintModalOpened" header="Add Complaint">
      <complaint-form
        :departments="allDepartments"
        @submit="addComplaint"
        @cancel="isAddComplaintModalOpened = false"
      />
    </t-modal>
    <t-modal v-model="isUpdateModalOpened" header="Update Complaint">
      <complaint-form
        :complaint="selectedComplaint"
        :departments="allDepartments"
        @updateComplaint="updateComplaint"
        @cancel="isUpdateModalOpened = false"
      />
    </t-modal>
    <t-modal v-model="isConfirmModalOpened" header="Confirm Delete">
      <confirm-modal
        :message="deleteMessage"
        @confirm="deleteComplaint"
        @cancel="isConfirmModalOpened = false"
      />
    </t-modal>
    <div class="max-w-7xl my-3 flex justify-between mx-auto">
      <h1 class="text-2xl font-semibold text-gray-900">Complaint</h1>
      <t-button @click="isAddComplaintModalOpened = true"> Add Complaint </t-button>
    </div>
    <t-table
      :headers="['Name', 'Description', 'Actions']"
      :data="allComplaints"
      class="bg-white shadow-sm"
    >
      <template slot="row" slot-scope="props">
        <tr>
          <td class="p-3">
            {{ props.row.title }}
          </td>
          <td class="p-3">
            {{ props.row.description }}
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
            <button
              type="button"
              class="hidden sm:inline-flex relative items-center mx-2 px-4 py-2 rounded-md border border-gray-300 bg-blue-200 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
              @click="openUpdateComplaintModal(props.row._id)"
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
    <div class="flex justify-center my-3">
      <div class="class max-w-2xl">
        <t-pagination
          v-model="urlParams.page"
          :total-items="complaintCount"
          :per-page="urlParams.limit"
          :limit="5"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import * as complaintTypes from "../../store/modules/complaints/complaint-types";
import * as departmentTypes from "../../store/modules/departments/department-types";
import ComplaintForm from "../../components/complaints/complaintForm.vue";
import ConfirmModal from "../../components/common/confirm-modal.vue";
import AdminHeaderComponent from "../../components/common/admin-header.vue";

export default {
  name: "AdminComplaint",
  components: {
    ComplaintForm,
    ConfirmModal,
    AdminHeaderComponent,
  },
  data() {
    return {
      isAddComplaintModalOpened: false,
      showSidebar: true,
      isConfirmModalOpened: false,
      isUpdateModalOpened: false,
      selectedComplaint: null,
      deleteMessage: "",
      urlParams: {
        page: 1,
        limit: 5,
      },
    };
  },
  computed: {
    ...mapGetters({
      allComplaints: complaintTypes.GET_ALL_COMPLAINTS,
      complaintCount: complaintTypes.GET_COMPLAINT_COUNT,
      allDepartments: departmentTypes.GET_ALL_DEPARTMENTS,
    }),
  },
  watch: {
    $route() {
      this.getAllComplaints(this.urlParams);
    },
    urlParams: {
      handler: "updateRoute",
      deep: true,
    },
  },
  mounted() {
    this.getAllComplaints(this.urlParams);
    this.getAllDepartments();
  },
  methods: {
    ...mapActions({
      addComplaintAction: complaintTypes.CREATE_COMPLAINT_ACTION,
      updateComplaintAction: complaintTypes.UPDATE_COMPLAINT_ACTION,
      deleteComplaintAction: complaintTypes.DELETE_COMPLAINT_ACTION,
      getAllComplaints: complaintTypes.GET_ALL_COMPLAINTS_ACTION,
      getAllDepartments: departmentTypes.GET_ALL_DEPARTMENTS_ACTION,
    }),
    async updateRoute() {
      try {
        await this.$router.push({ name: "AdminComplaints", query: this.urlParams });
      } catch (navigationError) {
        // Catch and ignore navigation errors caused through multiple params changed
      }
    },
    addComplaint(payload) {
      const formattedPayload = {
        title: payload.title,
        description: payload.description,
        department: payload.department,
        device: payload.device,
      };
      this.addComplaintAction(formattedPayload);
      this.isAddComplaintModalOpened = false;
    },
    closeSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    deleteComplaint() {
      this.isConfirmModalOpened = false;
      this.deleteComplaintAction(this.selectedComplaint._id);
    },
    openUpdateComplaintModal(id) {
      this.isUpdateModalOpened = true;
      this.selectedComplaint = this.allComplaints.find((item) => item._id === id);
    },
    updateComplaint() {
      this.isUpdateModalOpened = false;
      this.updateComplaintAction(this.selectedComplaint);
    },
    openConfirmDeleteModal(id) {
      this.isConfirmModalOpened = true;
      this.selectedComplaint = this.allComplaints.find((item) => item._id === id);
      this.deleteMessage = `Are you sure you want to delete Complaint title "${this.selectedComplaint.title}" ?`;
    },
  },
};
</script>
