<template>
  <transition name="fade">
    <div v-if="duration > 0" id="countdown">
      {{ days }}d{{ hours }}h{{ minutes }}m{{ seconds }}s
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    duration() {
      return this.$store.state.event.timeUntilStart;
    },
    days() {
      return this.duration.days();
    },
    hours() {
      return this.duration.hours();
    },
    minutes() {
      return this.duration.minutes();
    },
    seconds() {
      return this.duration.seconds();
    }
  }
};
</script>
