<template>
  <div class="queue-countdown">
    You are in line.
    <span class="queue-countdown-value">:{{ countdown }}s</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countdown: 30,
      countdownInterval: null
    };
  },
  beforeDestroy() {
    clearInterval(this.countdownInterval);
  },
  mounted() {
    this.handleCountdown();
  },
  methods: {
    handleCountdown() {
      this.countdownInterval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown -= 1;
        } else {
          clearInterval(this.countdownInterval);
        }
      }, 1000);
    }
  }
};
</script>
