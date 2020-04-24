<template>
  <div class="decision">
    <transition name="fade-step" mode="in-out">
      <div v-if="decided">
        <Enjoy v-if="allowEntry" @confirmDecision="handleConfirmDecision" />
        <TryAgain v-else @confirmDecision="handleConfirmDecision" />
      </div>
    </transition>

    <div v-if="!decided" class="decision-loader">
      <span class="decision-loader-dot">.</span>
      <span class="decision-loader-dot">.</span>
      <span class="decision-loader-dot">.</span>
    </div>
  </div>
</template>

<script>
import Enjoy from './Enjoy.vue';
import TryAgain from './TryAgain.vue';

export default {
  components: {
    Enjoy,
    TryAgain
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      decided: false,
      decisionTime: 1500
    };
  },
  computed: {
    allowEntry() {
      // return Math.random() >= 0.3; // 70% probability to get in
      return true;
    }
  },
  mounted() {
    setTimeout(() => {
      this.makeDecision();
    }, this.decisionTime);
  },
  methods: {
    makeDecision() {
      this.decided = true;
    },
    handleConfirmDecision(accessGranted) {
      if (accessGranted) {
        this.$emit('enterClub');
      } else {
        this.$emit('tryAgain');
      }
    }
  }
};
</script>
