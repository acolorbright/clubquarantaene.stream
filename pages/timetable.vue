<template>
  <div class="page timetable">
    <div class="current-time">
      {{ currentHour }}<span class="blinking">:</span>{{ currentMinute }} CEST
    </div>
    <ul class="timetable-list">
      <li
        v-for="(artist, index) in $store.state.content.timetable"
        :key="artist.name"
        class="timetable-list-entry"
        :class="{
          'has-ended': checkIfEnded(artist, index)
        }"
      >
        <span class="time">{{ artist.start }}—{{ artist.end }}</span>
        <span class="artist">{{ artist.name }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import moment from 'moment-timezone';

export default {
  name: 'Timetable',
  data() {
    return {
      currentTime: moment.tz('Europe/Berlin'),
      interval: null
    };
  },
  computed: {
    currentHour() {
      return ('0' + this.currentTime.hours()).slice(-2);
    },
    currentMinute() {
      return ('0' + this.currentTime.minutes()).slice(-2);
    }
  },
  methods: {
    checkIfEnded(artist, index) {
      const formattedEndTime = moment.tz(
        `${artist.day} ${artist.end}`,
        'Europe/Berlin'
      );
      return this.currentTime.isAfter(formattedEndTime);
    }
  },
  mounted() {
    const vm = this;
    vm.interval = setInterval(() => {
      vm.currentTime = moment.tz('Europe/Berlin');
    }, 30000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>
