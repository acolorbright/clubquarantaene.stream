<template>
  <div class="countdown">
    {{ days }}d{{ hours }}h{{ minutes }}m{{ seconds }}s
  </div>
</template>

<script>
import moment from 'moment-timezone';

export default {
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  data() {
    return {
      currentTime: moment().tz('Europe/Berlin')
    };
  },
  computed: {
    duration() {
      return moment.duration(
        this.$store.state.content.data.event.start.diff(this.currentTime)
      );
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
    },
    eventHasStarted() {
      return (
        this.days <= 0 &&
        this.hours <= 0 &&
        this.minutes <= 0 &&
        this.seconds <= 0
      );
    }
  },
  beforeMount() {
    const vm = this;
    setInterval(() => {
      vm.currentTime = moment().tz('Europe/Berlin');
    }, 1000);
  }
};
</script>
