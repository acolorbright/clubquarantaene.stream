<template>
  <div>
    <h3>{{ data.title }} ({{ data.type }})</h3>

    <div v-if="!data.isValidated">
      <button @click="nextStep">no</button>
      <button @click="nextStep">yes</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  methods: {
    nextStep() {
      this.$emit('nextStep', true);
    }
  }
};
</script>
