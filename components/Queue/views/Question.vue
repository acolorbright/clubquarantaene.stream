<template>
  <div v-if="!counterIsRunning">
    <h3 class="step-title">{{ data.title }}</h3>

    <div class="step-buttons step-buttons--large">
      <button class="step-buttons-btn" @click="stepConfirmed">yes</button>
      <button class="step-buttons-btn" @click="stepDeclined">no</button>
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
      isDebugMode: process.env.isDebugMode
    };
  },
  methods: {
    stepDeclined() {
      const isSupporterAction = this.data.action === 'supporter';
      if (isSupporterAction) {
        const url = 'https://steadyhq.com/en/clubquarantaene';
        const win = window.open(url, '_blank');
        win.focus();
      }
      this.$emit('nextStep', true);
    },
    stepConfirmed() {
      const isCookieQuestion = this.data.action === 'cookies';
      if (!this.isDebugMode && isCookieQuestion) {
        this.$gtag.optIn();
      }
      this.$emit('nextStep', true);
    }
  }
};
</script>
