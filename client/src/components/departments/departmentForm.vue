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
              v-model="departmentData.name"
              type="text"
              name="Name"
              :variant="errors.length > 0 ? 'danger' : ''"
            />
          </t-input-group>
        </ValidationProvider>
      </div>
      <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:gap-8 sm:my-4">
        <t-input-group label="Department Desription (Optional)">
          <t-textarea
            v-model="departmentData.description"
            rows="10"
            cols="60"
            placeholder="Describe this department in some detail"
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
  name: 'DepartmentForm',
  props: {
    department: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      departmentData: {
        content: '',
      },
    };
  },
  mounted() {
    if (this.department) {
      this.departmentData = this.department;
    }
  },
  methods: {
    submitForm() {
      if (this.department) {
        this.$emit('updateDepartment', this.departmentData);
      } else {
        this.$emit('submit', this.departmentData);
      }
    },
  },
};
</script>

