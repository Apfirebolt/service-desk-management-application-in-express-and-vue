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
      Home
    </router-link>

    <router-link :to="{ name: 'Dashboard'}"
                 class="text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
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
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
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

    <router-link v-if="profileData.isAdmin" :to="{ name: 'AdminComplaints'}"
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
          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
        />
      </svg>
      Admin
    </router-link>

    <router-link v-if="profileData.userType === 'staff'" :to="{ name: 'StaffComplaints'}"
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
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
      Assigned Complaints
    </router-link>

    <p class="text-white text-2xl">
      Welcome, {{ username }}
    </p>
  </nav>
</template>
<script>
export default {
  name: 'DesktopMenu',
  props: {
    profileData: {
      required: true,
      type: Object,
      default: () => {}
    }
  },
  computed: {
    username() {
      if (this.profileData) {
        return this.profileData.firstName + ' ' + this.profileData.lastName
      }
      return ''
    }
  }
};
</script>
