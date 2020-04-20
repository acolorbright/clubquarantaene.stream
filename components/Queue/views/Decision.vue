<template>
  <div>
    <h3>{{ title }} ({{ type }})</h3>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: null
    }
  }
};
</script>
