<template>
  <div class="start start-gradient">
    <div class="start-content">
      <Logo />

      <div v-if="!eventHasStarted" class="">
        <Countdown />
        <Newsletter />
        <SocialIcons />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Logo from '~/components/Logo.vue';
import Countdown from '~/components/Countdown.vue';
import Newsletter from '~/components/Newsletter.vue';
import SocialIcons from '~/components/SocialIcons.vue';

export default {
  components: {
    Logo,
    Countdown,
    Newsletter,
    SocialIcons
  },
  props: {
    data: {
      type: Object,
      default: null
    },
    hasStarted: {
      type: Boolean,
      default: false
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
