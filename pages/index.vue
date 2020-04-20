<template>
  <div>
    <!-- <div class="homepage" :style="bgStyleObj">
      <Logo />
      <Countdown v-if="showCountdown" />
      <Newsletter v-if="$store.state.content.data.settings.showNewsletter" />
      <div
        v-if="$store.state.content.data.content.text"
        class="splashpage-text"
        v-html="$store.state.content.data.content.text"
      />
    </div> -->
    Index page

    <Queue />
  </div>
</template>

<script>
// import Countdown from '~/components/Countdown';
// import Logo from '~/components/Logo';
// import Newsletter from '~/components/Newsletter';
import Queue from '~/components/Queue';

export default {
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  components: {
    Queue
    // Logo,
    // Countdown,
    // Newsletter
  },
  computed: {
    showCountdown() {
      return (
        !this.$store.state.content.eventIsRunning &&
        !this.$store.state.content.eventIsOver
      );
    }
  }
};
</script>
