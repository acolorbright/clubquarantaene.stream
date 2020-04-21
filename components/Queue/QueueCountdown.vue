<template>
  <div class="queue-countdown">
    You are in line.
    <span class="queue-countdown-value">:{{ countdownValue }}s</span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      countdownInterval: null
    };
  },
  computed: {
    countdown() {
      return this.$store.state.queue.countdown;
    },
    countdownValue() {
      return this.countdown.value;
    },
    isRunning() {
      return this.countdown.isRunning;
    }
  },
  beforeDestroy() {
    clearInterval(this.countdownInterval);
  },
  mounted() {
    console.log('countdown mounted');
    this.initCountdown();
  },
  methods: {
    ...mapActions({
      reduceCountdown: 'reduceCountdown',
      setCountdownIsRunning: 'setCountdownIsRunning'
    }),
    initCountdown() {
      this.setCountdownIsRunning(true);

      this.countdownInterval = setInterval(() => {
        if (this.isRunning && this.countdownValue > 0) {
          this.reduceCountdown();
        } else if (this.countdownValue === 0) {
          clearInterval(this.countdownInterval);
        }
      }, 1000);
    }
  }
};
</script>
