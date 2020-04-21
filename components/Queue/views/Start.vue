<template>
  <div class="start start-gradient">
    Start
    <h3 v-if="!showCountdown" class="step-title">
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
      this.showCountdown = true;
    }, 500);

    setTimeout(() => {
      this.nextStep();
    }, 1500);
  },
  methods: {
    nextStep() {
      this.$emit('nextStep', true);
    }
  }
};
</script>
