<template>
  <div>
    <header-component />
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="p-3 bg-green-700 text-white">
      <p class="text-3xl">Service Management App</p>
      <p class="text-lg my-2">
        Service Management App acts as a portal to register your grievances and complaints for your organisation. There would be an admin
        and multiple user types. Admin can add users and assign roles to them, there would be normal users who would register complaints,
        staff users would service those complaints.
      </p>
    </div>
    <footer-component />
  </div>
</template>
<script>
import HeaderComponent from '../components/common/header.vue';
import FooterComponent from '../components/common/footer.vue';

export default {
  name: 'Home',
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>