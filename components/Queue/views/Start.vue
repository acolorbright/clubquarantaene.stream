<template>
  <div class="start">
    <h3 class="step-title start-gradient">
      <Logo />
    </h3>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Logo from '~/components/Logo.vue';

export default {
  components: {
    Logo
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  mounted() {
    setTimeout(() => {
      this.nextStep();
      this.setCountdownIsRunning(true);
    }, 2000);

    setTimeout(() => {
      this.nextStep();
    }, 7000);
  },
  methods: {
    ...mapActions({
      setCountdownIsRunning: 'setCountdownIsRunning'
    }),
    nextStep() {
      this.$emit('nextStep', true);
    }
  }
};
</script>
