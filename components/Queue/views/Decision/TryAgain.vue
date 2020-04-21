<template>
  <div>
    <h3 class="step-title">Sorry, not today.</h3>

    <div class="step-buttons-btn">
      <button class="step-buttons" @click="tryAgain">Try again</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    tryAgain() {
      this.$emit('confirmDecision', false);
    }
  }
};
</script>
