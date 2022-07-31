<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form class="font-medium text-gray-700" @submit.prevent="handleSubmit(submitForm)">
      <div class="grid grid-cols-2 gap-x-6 gap-y-4 sm:gap-8 sm:my-4">
        <ValidationProvider v-slot="{ errors }" name="First Name" rules="required">
          <t-input-group
            label="First Name*"
            :feedback="errors[0]"
            :variant="errors.length > 0 ? 'danger' : ''"
          >
            <t-input
              v-model="userData.firstName"
              placeholder="First Name"
              type="text"
              name="firstName"
              :variant="errors.length > 0 ? 'danger' : ''"
            />
          </t-input-group>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" name="First Name" rules="required">
          <t-input-group
            label="Last Name*"
            :feedback="errors[0]"
            :variant="errors.length > 0 ? 'danger' : ''"
          >
            <t-input
              v-model="userData.lastName"
              placeholder="Last Name"
              type="text"
              name="lastName"
              :variant="errors.length > 0 ? 'danger' : ''"
            />
          </t-input-group>
        </ValidationProvider>
      </div>
      <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:gap-8 sm:my-4">
        <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">
          <t-input-group
            label="Email*"
            :feedback="errors[0]"
            :variant="errors.length > 0 ? 'danger' : ''"
          >
            <t-input
              v-model="userData.email"
              placeholder="Email Address"
              type="email"
              name="email"
              :variant="errors.length > 0 ? 'danger' : ''"
            />
          </t-input-group>
        </ValidationProvider>
      </div>

      <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:gap-8 sm:my-4">
        <t-input-group label="User Type Selection">
          <t-select
            v-model="userData.userType"
            placeholder="Select User Type"
            :options="userTypeChoices"
            name="User Type"
            value-attribute="type"
            text-attribute="name"
          />
        </t-input-group>
      </div>

      <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:gap-8 sm:my-4">
        <ValidationProvider v-slot="{ errors }" name="Password" rules="required|min:8">
          <t-input-group
            label="Password*"
            :feedback="errors[0]"
            :variant="errors.length > 0 ? 'danger' : ''"
          >
            <t-input
              v-model="userData.password"
              placeholder="Password"
              type="password"
              name="password"
              :feedback="errors[0]"
              :variant="errors.length > 0 ? 'danger' : ''"
            />
          </t-input-group>
        </ValidationProvider>
      </div>

      <div class="flex justify-between mt-6">
        <t-button type="button" variant="error" @click="$emit('cancel')"> Cancel </t-button>
        <t-button type="submit"> Submit </t-button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
export default {
  name: "AddUpdateUserForm",
  props: {
    user: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      userData: {
        firstName: "",
        lastName: "",
        userType: "",
        password: "",
      },
      userTypeChoices: [
        {
          type: "member",
          name: "Member",
        },
        {
          type: "staff",
          name: "Staff",
        },
      ],
    };
  },
  mounted() {
    if (this.user) {
      this.userData = this.user;
    }
  },
  methods: {
    submitForm() { 
      this.$emit("submit", this.userData);
    },
  },
};
</script>
