<template>
  <div v-if="!counterIsRunning">
    <h3 class="step-title">{{ data.title }}</h3>

    <div class="step-buttons">
      <button class="step-buttons-btn" @click="stepDeclined">no</button>
      <button class="step-buttons-btn" @click="stepConfirmed">yes</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    },
    counterIsRunning: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isDev: process.env.isDev
    };
  },
  methods: {
    stepDeclined() {
      this.$emit('nextStep', true);
    },
    stepConfirmed() {
      const isCookieQuestion = this.data.action === 'cookies';
      if (!this.isDev && isCookieQuestion) {
        this.$gtag.optIn();
      }

      this.$emit('nextStep', true);
    }
  }
};
</script>
