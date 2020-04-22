<template>
  <div class="start">
    <h3 class="step-title start-gradient">
      {{ data.title }} ({{ data.type }})
    </h3>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.setCountdownIsRunning(true);

    setTimeout(() => {
      this.nextStep();
    }, 2000); // should be 5s
  },
  methods: {
    ...mapActions({
      setCountdownIsRunning: 'setCountdownIsRunning'
    }),
    nextStep() {
      this.$emit('nextStep', true);
    }
  }
};
</script>
