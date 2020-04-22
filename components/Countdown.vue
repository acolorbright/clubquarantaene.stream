<template>
  <div id="countdown">{{ countdownDisplay }}</div>
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
    countdownDisplay() {
      return `${this.days}d${this.hours}h${this.minutes}m${this.seconds}s`;
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
    // const vm = this;
    // setInterval(() => {
    //   vm.currentTime = moment().tz('Europe/Berlin');
    // }, 1000);
  }
};
</script>
