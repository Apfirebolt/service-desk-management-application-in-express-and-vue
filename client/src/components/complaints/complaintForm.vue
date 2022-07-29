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
              v-model="deviceData.title"
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
            v-model="deviceData.device"
            placeholder="Select Device"
            :options="deviceChoices"
            name="Device"
          />
        </t-input-group>
        <t-input-group label="Department Selection">
          <t-select
            v-model="deviceData.department"
            placeholder="Select Device"
            :options="deviceChoices"
            name="Device"
          />
        </t-input-group>
      </div>
      <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:gap-8 sm:my-4">
        <t-input-group label="Complaint Desription (Optional)">
          <t-textarea
            v-model="deviceData.content"
            rows="10"
            cols="60"
            placeholder="Describe your complaint in some detail"
          />
        </t-input-group>
      </div>

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
export default {
  name: 'AddUpdateComplaintForm',
  props: {
    complaint: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      deviceData: {
        content: '',
      },
      deviceChoices: ['Mobile', 'Laptop', 'Other Accessories'],
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
    handleContentUpdate(content) {
      this.complaintData = {
        content,
      };
    },
  },
};
</script>
