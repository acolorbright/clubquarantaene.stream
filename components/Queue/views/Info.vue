<template>
  <div>
    <h3>{{ data.title }} ({{ data.type }})</h3>
    <p>{{ data.text }}</p>

    <button @click="nextStep">understood</button>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  methods: {
    nextStep() {
      this.$emit('nextStep', true);
    }
  }
};
</script>
