<template>
  <div class="w-3/4 py-3 mx-auto">
    <staff-header-component />
    <t-modal v-model="isUpdateModalOpened" header="Update Complaint">
      <complaint-status-form
        :complaint="selectedComplaint"
        :departments="allDepartments"
        :staffUsers="staffUsers"
        @updateComplaint="updateComplaint"
        @cancel="isUpdateModalOpened = false"
      />
    </t-modal>
    <div class="max-w-7xl my-3 flex justify-center mx-auto">
      <h1 class="text-2xl font-semibold text-gray-900">Complaint</h1>
    </div>
    <div v-if="allComplaints.length">
      <t-table
        :headers="['Name', 'Description', 'Status', 'Actions']"
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
              {{ props.row.status }}
            </td>
            <td class="p-3">
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
    <p v-else class="text-center text-lg my-3 text-green-600">
      No Complaints Assigned to you
    </p>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import * as complaintTypes from "../../store/modules/complaints/complaint-types";
import * as departmentTypes from "../../store/modules/departments/department-types";
import * as authTypes from "../../store/modules/auth/auth-types";
import ComplaintStatusForm from "../../components/complaints/complaintStatusForm.vue";
import ConfirmModal from "../../components/common/confirm-modal.vue";
import StaffHeaderComponent from "../../components/common/staff-header.vue";

export default {
  name: "StaffComplaint",
  components: {
    ComplaintStatusForm,
    ConfirmModal,
    StaffHeaderComponent,
  },
  data() {
    return {
      showSidebar: true,
      isConfirmModalOpened: false,
      isUpdateModalOpened: false,
      selectedComplaint: null,
      urlParams: {
        page: 1,
        limit: 5,
        staff: true
      },
    };
  },
  computed: {
    ...mapGetters({
      allComplaints: complaintTypes.GET_ALL_COMPLAINTS,
      complaintCount: complaintTypes.GET_COMPLAINT_COUNT,
      allDepartments: departmentTypes.GET_ALL_DEPARTMENTS,
      profileData: authTypes.GET_PROFILE_DATA,
      staffUsers: authTypes.GET_ALL_USERS
    }),
  },
  watch: {
    $route() {
      this.getAllStaffComplaints(this.urlParams);
    },
    urlParams: {
      handler: "updateRoute",
      deep: true,
    },
  },
  mounted() {
    this.getAllStaffComplaints(this.urlParams);
    this.getAllDepartments();
  },
  methods: {
    ...mapActions({
      updateComplaintAction: complaintTypes.UPDATE_COMPLAINT_ACTION,
      getAllStaffComplaints: complaintTypes.GET_ALL_STAFF_COMPLAINTS_ACTION,
      getAllDepartments: departmentTypes.GET_ALL_DEPARTMENTS_ACTION,
    }),
    async updateRoute() {
      try {
        await this.$router.push({ name: "AdminComplaints", query: this.urlParams });
      } catch (navigationError) {
        // Catch and ignore navigation errors caused through multiple params changed
      }
    },
    closeSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    openUpdateComplaintModal(id) {
      this.isUpdateModalOpened = true;
      this.selectedComplaint = this.allComplaints.find((item) => item._id === id);
    },
    updateComplaint() {
      this.isUpdateModalOpened = false;
      this.updateComplaintAction(this.selectedComplaint);
    },
  },
};
</script>
