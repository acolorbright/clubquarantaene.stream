<template>
  <div class="start">
    <h3 class="step-title start-gradient">
      {{ data.title }}
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
    setTimeout(() => {
      this.nextStep();
      this.setCountdownIsRunning(true);
    }, 2000);

    setTimeout(() => {
      this.nextStep();
    }, 7000);
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
