<template>
  <div>
    <h3>{{ data.title }} ({{ data.type }})</h3>

    <div v-if="!data.isValidated">
      <button @click="handleAnswer">no</button>
      <button @click="handleAnswer">yes</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

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
  },
  methods: {
    handleAnswer() {
      this.validateStep();
    },
    validateStep() {
      this.setStepIsValid({
        index: this.stepIndex,
        isValidated: true
      });
    },
    ...mapActions({
      setStepIsValid: 'setStepIsValid'
    })
  }
};
</script>
