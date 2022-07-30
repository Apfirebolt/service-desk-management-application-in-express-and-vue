<template>
  <div class="flex flex-col justify-center">
    <p class="text-2xl text-center m-2">{{ complaint.title }}</p>
    <p class="text-center">{{ complaint.description }}</p>
  </div>
</template>
<script>

export default {
  name: 'ComplaintCard',
  props: {
    complaint: {
      type: Object,
      required: true
    }
  }
};
</script>
