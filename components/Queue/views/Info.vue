<template>
  <div>
    <h3 class="step-title">{{ data.title }} ({{ data.type }})</h3>
    <p class="step-text">{{ data.text }}</p>

    <div v-if="!data.isValidated" class="step-buttons">
      <button class="step-buttons-btn" @click="nextStep">
        understood
      </button>
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
