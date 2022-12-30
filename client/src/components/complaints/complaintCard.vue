<template>
  <div class="flex flex-col bg-white justify-center">
    <div class="rounded overflow-hidden shadow-lg">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ complaint.title }}</div>
        <p class="text-gray-700 text-base">
          {{ complaint.description }}
        </p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span
          v-if="complaint.managedBy"
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
         Managed By - {{ complaint.managedBy.firstName + " " + complaint.managedBy.lastName }}
        </span>
        <span
          v-if="complaint.managedBy"
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
         Status - {{ complaint.status }}
        </span>
      </div>
      <div class="flex justify-center items-center my-5">
        <t-button type="button" class="mx-2" variant="error" @click="deleteComplaintUtil">
          Delete
        </t-button>
        <t-button type="button" class="mx-2" @click="updateComplaintUtil"> Update </t-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComplaintCard",
  props: {
    complaint: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteComplaintUtil() {
      this.$emit("deleteComplaint", this.complaint._id);
    },
    updateComplaintUtil() {
      this.$emit("updateComplaint", this.complaint._id);
    },
  },
};
</script>
