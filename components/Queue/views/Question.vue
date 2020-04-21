<template>
  <div>
    <h3 class="step-title">{{ data.title }} ({{ data.type }})</h3>

    <div class="step-buttons">
      <button class="step-buttons-btn" @click="nextStep">no</button>
      <button class="step-buttons-btn" @click="nextStep">yes</button>
    </div>
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
