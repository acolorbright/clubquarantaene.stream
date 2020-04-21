<template>
  <div>
    <Enjoy @confirmDecision="handleConfirmDecision" />
    <br />
    <TryAgain @confirmDecision="handleConfirmDecision" />
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
      allowEntry: true
    };
  },
  methods: {
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
