<template>
  <div>
    <h3 v-if="!showCountdown">{{ data.title }} ({{ data.type }})</h3>
    <QueueCountdown v-else />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import QueueCountdown from '../QueueCountdown.vue';

export default {
  components: {
    QueueCountdown
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    stepIndex: {
      type: Number,
      default: null
    },
    data: {
      type: Object,
      default: null
    },
    form: {
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
    }, 1500);

    setTimeout(() => {
      this.setStepIsValid({
        index: this.stepIndex,
        isValidated: true
      });
    }, 3000);
  },
  methods: {
    ...mapActions({
      setStepIsValid: 'setStepIsValid'
    }),
    goToNextTab() {
      this.form.nextTab();
    }
  }
};
</script>
