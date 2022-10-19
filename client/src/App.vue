<template>
  <div id="app" class="bg-blue-50">
    <loading />
    <default-toast />
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Loading from "./components/common/loading.vue";
import DefaultToast from "./components/toasts/default-toast.vue";
import * as authTypes from "./store/modules/auth/auth-types";

export default {
  name: "App",
  components: {
    DefaultToast,
    Loading,
  },
  htmlAttrs: {
    lang: "en-US",
  },
  metaInfo: {
    title: 'Default App Title',
    titleTemplate: '%s | vue-meta Example App',
    description: 'Default App Description'
  },
  computed: {
    ...mapGetters({
      profileData: authTypes.GET_PROFILE_DATA,
    }),
  },
  methods: {
    ...mapActions({
      getProfileData: authTypes.GET_PROFILE_DATA_ACTION,
    }),
  },
};
</script>
