<template>
  <div class="bg-white shadow-sm rounded-md">
    <t-modal v-model="isAddComplaintModalOpened" header="Add Complaint">
      <complaint-form :departments="allDepartments" @submit="addComplaint" @cancel="isAddComplaintModalOpened = false" />
    </t-modal>
    <t-modal v-model="isUpdateModalOpened" header="Update Complaint">
      <complaint-form :complaint="selectedComplaint" :departments="allDepartments" @updateComplaint="updateComplaint" @cancel="isUpdateModalOpened = false" />
    </t-modal>
    <t-modal v-model="isConfirmModalOpened" header="Confirm Delete">
      <confirm-modal :message="deleteMessage" @confirm="deleteComplaint" @cancel="isConfirmModalOpened = false" />
    </t-modal>
    <div>
      <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
      <transition
        enter-active-class="transition ease-in-out duration-300 transform"
        enter-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition ease-in-out duration-300 transform"
        leave-class="translate-x-0"
        leave-to-class="-translate-x-full bg-green-600"
      >
        <div
          v-if="showSidebar"
          class="fixed inset-0 flex z-40 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true" />

          <div class="relative flex-1 flex flex-col max-w-xs w-full bg-gray-700">
            <!--
        Close button, show/hide based on off-canvas menu state.

        Entering: "ease-in-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in-out duration-300"
          From: "opacity-100"
          To: "opacity-0"
      -->
            <div class="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                @click="closeSidebar"
              >
                <span class="sr-only">Close sidebar</span>
                <!-- Heroicon name: outline/x -->
                <svg
                  class="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div class="flex-shrink-0 flex items-center px-4">
                <img
                  class="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg"
                  alt="Workflow"
                >
              </div>
              <mobile-menu-component :profile-data="profileData" />
            </div>
            <div class="flex-shrink-0 flex border-t border-indigo-800 p-4">
              <a href="#" class="flex-shrink-0 group block">
                <div class="flex items-center">
                  <div>
                    <img
                      class="inline-block h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    >
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div class="flex-shrink-0 w-14" aria-hidden="true">
            <!-- Force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </transition>

      <!-- Static sidebar for desktop -->
      <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex-1 flex flex-col min-h-0 bg-gray-700">
          <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <desktop-sidebar-component :profile-data="profileData" />
          </div>
        </div>
      </div>
      <div class="md:pl-64 flex flex-col flex-1">
        <div class="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
          <button
            type="button"
            class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            @click="showSidebar = true"
          >
            <span class="sr-only">Open sidebar</span>
            <!-- Heroicon name: outline/menu -->
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <main class="flex-1">
          <div class="py-6">
            <div class="max-w-7xl flex justify-between mx-auto px-4 sm:px-6 md:px-8">
              <h1 class="text-2xl font-semibold text-gray-900">
                Complaint
              </h1>
              <t-button @click="isAddComplaintModalOpened = true">
                Add Complaint
              </t-button>
            </div>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <!-- Replace with your content -->
              <div class="my-2 bg-gray-200 px-2 py-4 rounded-lg">
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 sm:gap-8 sm:my-4">
                  <div v-for="complaint in allComplaints" :key="complaint._id">
                    <complaint-card :complaint="complaint" @deleteComplaint="openConfirmDeleteModal" @updateComplaint="openUpdateComplaintModal" />
                  </div>
                </div>
              </div>
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
              <!-- /End replace -->
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import * as complaintTypes from '../../store/modules/complaints/complaint-types';
import * as authTypes from '../../store/modules/auth/auth-types';
import * as departmentTypes from "../../store/modules/departments/department-types";
import ComplaintForm from '../../components/complaints/complaintForm.vue';
import ComplaintCard from '../../components/complaints/complaintCard.vue';
import DesktopSidebarComponent from '../../components/common/sidebar.vue';
import MobileMenuComponent from '../../components/common/mobile-menu.vue';
import ConfirmModal from '../../components/common/confirm-modal.vue';

export default {
  name: 'ComplaintHome',
  components: {
    ComplaintForm,
    DesktopSidebarComponent,
    MobileMenuComponent,
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
      deleteMessage: '',
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
      profileData: authTypes.GET_PROFILE_DATA,
      allDepartments: departmentTypes.GET_ALL_DEPARTMENTS,
    }),
  },
  watch: {
    $route() {
      this.getAllComplaints(this.urlParams);
    },
    urlParams: {
      handler: 'updateRoute',
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
        await this.$router.push({ name: 'ComplaintsHome', query: this.urlParams });
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
