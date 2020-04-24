<template>
  <div>
    <h3 class="step-title">{{ data.title }}</h3>
    <p class="step-text">{{ data.text }}</p>

    <transition name="fade-step" mode="out-in">
      <div class="step-buttons step-buttons--large">
        <button class="step-buttons-btn" @click="nextStep">
          Understood
        </button>
      </div>
    </transition>
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
