<template>
  <div>
    <header-component />
    <p class="text-3xl w-full bg-gray-100 text-center py-3 text-red-600">
      ADMIN
    </p>
    <router-view />
    <footer-component />
  </div>
</template>
<script>
import HeaderComponent from '../components/common/header.vue';
import FooterComponent from '../components/common/footer.vue';

export default {
  name: 'AdminLayout',
  components: {
    HeaderComponent,
    FooterComponent
  }
};
</script>
