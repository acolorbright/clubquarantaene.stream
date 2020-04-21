<template>
  <div class="start">
    <h3 v-if="!showCountdown" class="step-title start-gradient">
      {{ data.title }} ({{ data.type }})
    </h3>
    <QueueCountdown v-else />
  </div>
</template>

<script>
import QueueCountdown from '../QueueCountdown.vue';

export default {
  components: {
    QueueCountdown
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      showCountdown: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.handleCountdown();
    }, 1000); // should be 5s

    setTimeout(() => {
      this.nextStep();
    }, 2000); // should be 5s
  },
  methods: {
    handleCountdown() {
      this.showCountdown = true;
    },
    nextStep() {
      this.$emit('nextStep', true);
    }
  }
};
</script>
