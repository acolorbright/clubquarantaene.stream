<template>
  <div class="start start-gradient">
    <div class="start-content">
      <Logo />
      <!-- <Countdown /> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Logo from '~/components/Logo.vue';
// import Countdown from '~/components/Countdown.vue';

export default {
  components: {
    Logo
    // Countdown
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.nextStep();
    //   this.setQueueCountdownIsRunning(true);
    // }, 2000);
    // setTimeout(() => {
    //   this.nextStep();
    // }, 7000);
  },
  methods: {
    ...mapActions({
      setQueueCountdownIsRunning: 'setQueueCountdownIsRunning'
    }),
    nextStep() {
      this.$emit('nextStep', true);
    }
  }
};
</script>
