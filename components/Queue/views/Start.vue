<template>
  <div
    class="start"
    :class="{
      'start-gradient': showStart
    }"
  >
    <transition name="fade-step" mode="out-in">
      <div v-if="showStart" class="start-content">
        <Logo />
        <!-- <div>
          <Countdown />
          <Newsletter />
          <SocialIcons />
        </div> -->
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Logo from '~/components/Logo.vue';
// import Countdown from '~/components/Countdown.vue';
// import Newsletter from '~/components/Newsletter.vue';
// import SocialIcons from '~/components/SocialIcons.vue';

export default {
  components: {
    Logo
    // Countdown,
    // Newsletter,
    // SocialIcons
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
  data() {
    return {
      showStart: false,
      isDev: process.env.isDev
    };
  },
  mounted() {
    this.showStart = true;
    this.startEvent();
  },
  methods: {
    ...mapActions({
      setQueueCountdownIsRunning: 'setQueueCountdownIsRunning'
    }),
    nextStep() {
      this.$emit('nextStep', true);
    },
    startEvent() {
      const firstStartTimeout = this.isDev ? 1000 : 3500;
      const secondStartTimeout = this.isDev ? 2000 : 9500;

      setTimeout(() => {
        this.showStart = false;
        this.setQueueCountdownIsRunning(true);
      }, firstStartTimeout);

      setTimeout(() => {
        this.nextStep();
      }, secondStartTimeout);
    }
  }
};
</script>
