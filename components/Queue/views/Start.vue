<template>
  <div class="start">
    <h3 class="step-title start-gradient">
      {{ data.title }} ({{ data.type }})
    </h3>
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
  mounted() {
    setTimeout(() => {
      this.nextStep();
    }, 2000); // should be 5s
  },
  methods: {
    nextStep() {
      this.$emit('nextStep', true);
    }
  }
};
</script>
