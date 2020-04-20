<template>
  <div>
    <h3>{{ data.title }} ({{ data.type }})</h3>

    <Enjoy v-if="allowEntry" />
    <TryAgain v-else />
  </div>
</template>

<script>
import Enjoy from './Enjoy.vue';
import TryAgain from './TryAgain.vue';

export default {
  components: {
    Enjoy,
    TryAgain
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
  data() {
    return {
      allowEntry: true
    };
  }
};
</script>
