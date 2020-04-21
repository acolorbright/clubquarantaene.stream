<template>
  <div>
    <Logo />
    <Queue />
  </div>
</template>

<script>
import Logo from '~/components/Logo';
import Queue from '~/components/Queue';
// import Newsletter from '~/components/Newsletter';

export default {
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  components: {
    Logo,
    Queue
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
