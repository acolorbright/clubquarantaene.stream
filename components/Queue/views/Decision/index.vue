<template>
  <div>
    <h3>{{ data.title }} ({{ data.type }})</h3>

    <Enjoy />
    <TryAgain />
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
