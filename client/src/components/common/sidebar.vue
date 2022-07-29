<template>
  <nav class="mt-5 flex-1 px-2 space-y-1">
    <!-- Current: "bg-indigo-800 text-white", Default: "text-white hover:bg-indigo-600 hover:bg-opacity-75" -->
    <router-link :to="{ name: 'Home'}"
                 class="bg-indigo-800 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
    >
      <!-- Heroicon name: outline/home -->
      <svg
        class="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
      Dashboard
    </router-link>

    <router-link :to="{ name: 'ComplaintsHome'}"
                 class="text-white hover:bg-indigo-600 hover:bg-opacity-75 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
    >
      <!-- Heroicon name: outline/users -->
      <svg
        class="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      Complaints
    </router-link>

  </nav>
</template>
<script>
export default {
  name: 'DesktopMenu',
};
</script>
