<template>
  <div>
    <h3 class="step-title">{{ data.title }} ({{ data.type }})</h3>
    <p class="step-text">{{ data.text }}</p>

    <transition name="fade-step" mode="out-in">
      <div v-if="!countdownIsRunning" class="step-buttons">
        <button class="step-buttons-btn" @click="nextStep">
          understood
        </button>
      </div>
    </transition>
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
  computed: {
    countdownIsRunning() {
      return this.$store.state.queue.countdown.isRunning;
    }
  },
  mounted() {
    setTimeout(() => {
      this.pauseCountdown();
    }, 2000);
  },
  methods: {
    ...mapActions({
      setCountdownIsRunning: 'setCountdownIsRunning'
    }),
    nextStep() {
      this.$emit('nextStep', true);
      this.resumeCountdown();
    },
    pauseCountdown() {
      this.setCountdownIsRunning(false);
    },
    resumeCountdown() {
      this.setCountdownIsRunning(true);
    }
  }
};
</script>
