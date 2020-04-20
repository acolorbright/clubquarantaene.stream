<template>
  <div>
    <Logo v-if="!data.isValidated" />
    <div v-else>
      <h3>{{ data.title }} ({{ data.type }})</h3>
      <QueueCountdown />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import QueueCountdown from '../QueueCountdown.vue';
import Logo from '~/components/Logo.vue';

export default {
  components: {
    Logo,
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
    }
  },
  mounted() {
    setTimeout(() => {
      this.setStepIsValid({
        index: this.stepIndex,
        isValidated: true
      });
    }, 1000);
  },
  methods: {
    ...mapActions({
      setStepIsValid: 'setStepIsValid'
    })
  }
};
</script>
