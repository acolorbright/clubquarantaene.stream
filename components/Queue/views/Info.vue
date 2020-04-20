<template>
  <div>
    <h3>{{ data.title }} ({{ data.type }})</h3>
    <p>{{ data.text }}</p>
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
  mounted() {
    setTimeout(() => {
      this.setStepIsValid({
        index: this.stepIndex,
        isValidated: true
      });
    }, 500);
  },
  methods: {
    ...mapActions({
      setStepIsValid: 'setStepIsValid'
    })
  }
};
</script>
