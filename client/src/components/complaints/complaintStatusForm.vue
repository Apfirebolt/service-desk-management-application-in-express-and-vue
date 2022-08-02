<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form class="font-medium text-gray-700" @submit.prevent="handleSubmit(submitForm)">
      <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:gap-8 sm:my-4">
        <t-input-group label="Device Selection">
          <t-select
            v-model="complaintData.device"
            placeholder="Select Device"
            :options="deviceChoices"
            name="Device"
          />
        </t-input-group>
      </div>

      <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:gap-8 sm:my-4">
        <t-input-group label="Status Selection">
          <t-select
            v-model="complaintData.status"
            placeholder="Select Status"
            :options="statusChoices"
            name="Status"
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
  name: 'ComplaintStatusForm',
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
      this.$emit('updateComplaint', this.complaintData);
    },
  },
};
</script>
