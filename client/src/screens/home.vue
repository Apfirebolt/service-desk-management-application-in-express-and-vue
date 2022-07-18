<template>
  <div>
    <header-component />
    <!-- This example requires Tailwind CSS v2.0+ -->
    <p>Homepage view</p>    
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
  data() {
    return {
      user: {},
    };
  },
};
</script>
