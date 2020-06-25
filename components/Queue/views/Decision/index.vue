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
import { getLocalStorage } from '~/assets/js/handleLocalStorage.js';

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
      decisionTime: 1000,
      isFirstVisit: true
    };
  },
  computed: {
    allowEntry() {
      if (!this.isFirstVisit || process.env.isDebugMode) {
        return true;
      }
      return Math.random() >= 0.3; // 70% probability to get in
    }
  },

  mounted() {
    setTimeout(() => {
      this.makeDecision();
    }, this.decisionTime);
  },
  methods: {
    makeDecision() {
      const localStorageData = getLocalStorage();
      if (localStorageData && localStorageData.color) {
        this.isFirstVisit = false;
      }

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
