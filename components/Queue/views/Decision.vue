<template>
  <div>
    <h3>{{ data.title }} ({{ data.type }})</h3>
    <p>{{ data.text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    stepIndex: {
      type: Number,
      default: null
    },
    data: {
      type: Object,
      default: null
    }
  }
};
</script>
