<template>
  <div>
    You are in line.
    <div>:{{ countdown }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countdown: 10,
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
