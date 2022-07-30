<template>
  <div>
    <p>Admin Complaint List View</p>
    <t-modal v-model="isAddComplaintModalOpened" header="Add Complaint">
      <complaint-form @submit="addComplaint" @cancel="isAddComplaintModalOpened = false" />
    </t-modal>
    <t-modal v-model="isUpdateModalOpened" header="Update Complaint">
      <update-complaint-form
        :complaint="selectedComplaint"
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
    <div class="max-w-7xl flex justify-between mx-auto px-4 sm:px-6 md:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">Complaint</h1>
      <t-button @click="isAddComplaintModalOpened = true"> Add Complaint </t-button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import * as complaintTypes from "../../store/modules/complaints/complaint-types";
import ComplaintForm from "../../components/complaints/complaintForm.vue";
import ComplaintCard from "../../components/complaints/complaintCard.vue";
import ConfirmModal from "../../components/common/confirm-modal.vue";

export default {
  name: "AdminComplaint",
  components: {
    ComplaintForm,
    ComplaintCard,
    ConfirmModal,
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
      ComplaintCount: complaintTypes.GET_COMPLAINT_COUNT,
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
  },
  methods: {
    ...mapActions({
      addComplaintAction: complaintTypes.CREATE_COMPLAINT_ACTION,
      updateComplaintAction: complaintTypes.UPDATE_COMPLAINT_ACTION,
      deleteComplaintAction: complaintTypes.DELETE_COMPLAINT_ACTION,
      getAllComplaints: complaintTypes.GET_ALL_COMPLAINTS_ACTION,
    }),
    async updateRoute() {
      try {
        await this.$router.push({ name: "ComplaintsHome", query: this.urlParams });
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
      this.getAllComplaints();
    },
    closeSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    deleteComplaint() {
      this.isConfirmModalOpened = false;
      this.deleteComplaintAction(this.selectedComplaint._id);
      this.getAllComplaints();
    },
    openUpdateComplaintModal(id) {
      this.isUpdateModalOpened = true;
      this.selectedComplaint = this.allComplaints.find((item) => item._id === id);
    },
    updateComplaint() {
      this.isUpdateModalOpened = false;
      this.updateComplaintAction(this.selectedComplaint);
      this.getAllComplaints();
    },
    openConfirmDeleteModal(id) {
      this.isConfirmModalOpened = true;
      this.selectedComplaint = this.allComplaints.find((item) => item._id === id);
      this.deleteMessage = `Are you sure you want to delete Complaint title "${this.selectedComplaint.title}" ?`;
    },
  },
};
</script>
