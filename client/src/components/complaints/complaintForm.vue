<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form class="font-medium text-gray-700" @submit.prevent="handleSubmit(submitForm)">
      <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:gap-8 sm:my-4">
        <ValidationProvider v-slot="{ errors }" name="Title" rules="required">
          <t-input-group
            label="Title"
            :feedback="errors[0]"
            :variant="errors.length > 0 ? 'danger' : ''"
          >
            <t-input
              v-model="complaintData.title"
              type="text"
              name="Title"
              :variant="errors.length > 0 ? 'danger' : ''"
            />
          </t-input-group>
        </ValidationProvider>
      </div>
      <div class="grid grid-cols-2 gap-x-6 gap-y-4 sm:gap-8 sm:my-4">
        <t-input-group label="Device Selection">
          <t-select
            v-model="complaintData.device"
            placeholder="Select Device"
            :options="deviceChoices"
            name="Device"
          />
        </t-input-group>
        <t-input-group label="Department Selection">
          <t-select
            v-model="complaintData.department"
            placeholder="Select Department"
            :options="departments"
            name="Device"
            value-attribute="_id" 
            text-attribute="name"
          />
        </t-input-group>
      </div>
      <div v-if="staffUsers.length" class="grid grid-cols-2 gap-x-6 gap-y-4 sm:gap-8 sm:my-4">
        <t-input-group label="Status Selection">
          <t-select
            v-model="complaintData.status"
            placeholder="Select Status"
            :options="statusChoices"
            name="Status"
          />
        </t-input-group>
        <t-input-group label="Managed By">
          <t-select
            v-model="complaintData.managedBy"
            placeholder="Select Staff"
            :options="staffUsers"
            name="Device"
            value-attribute="_id" 
            text-attribute="firstName"
          />
        </t-input-group>
      </div>
      <vue-editor v-model="complaintData.description" />

      <div class="flex justify-between mt-6">
        <t-button type="button" variant="error" @click="$emit('cancel')">
          Cancel
        </t-button>
        <t-button type="submit">
          Submit
        </t-button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: 'AddUpdateComplaintForm',
  components: {
    VueEditor
  },
  props: {
    complaint: {
      type: Object,
      required: false,
      default: () => {}
    },
    departments: {
      type: Array,
      required: true,
      default: () => []
    },
    staffUsers: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {
      complaintData: {
        description: '',
      },
      deviceChoices: ['Mobile', 'Laptop', 'Other Accessories'],
      statusChoices: ['Pending', 'Opened', 'Closed']
    };
  },
  mounted() {
    if (this.complaint) {
      this.complaintData = this.complaint;
    }
  },
  methods: {
    submitForm() {
      if (this.complaint) {
        this.$emit('updateComplaint', this.complaintData);
      } else {
        this.$emit('submit', this.complaintData);
      }
    },
  },
};
</script>
