<template>
  <div class="timetable" @click="$store.commit('showTimetable', !$store.state.oldState.showTimetable)">
    <ul class="timetable-list">
      <li
        v-for="(dj, index) in timetable"
        :key="dj.name"
        class="timetable-entry"
        :class="{
          'has-ended': checkIfEnded(dj.end, index)
        }"
      >
        {{ dj.name }}<span
          v-for="n in (20 - dj.name.length)"
          :key="n"
        >_</span>{{ dj.start }}
      </li>
    </ul>
  </div>
</template>
<script>
import moment from 'moment-timezone'

export default {
  name: 'Timetable',
  data () {
    return {
      timetable: [
        {
          name: 'Mad Miran',
          start: '22:00',
          date: '2020-03-27',
          end: '2020-03-28 00:00'
        },
        {
          name: 'Gian',
          start: '00:00',
          date: '2020-03-28',
          end: '2020-03-28 01:00'
        },
        {
          name: 'Juba',
          start: '01:00',
          date: '2020-03-28',
          end: '2020-03-28 02:00'
        },
        {
          name: 'Victor',
          start: '02:00',
          date: '2020-03-28',
          end: '2020-03-28 04:00'
        },
        {
          name: 'Cem',
          start: '04:00',
          date: '2020-03-28',
          end: '2020-03-28 05:00'
        },
        {
          name: 'Adiel',
          start: '05:00',
          date: '2020-03-28',
          end: '2020-03-28 07:00'
        },
        {
          name: 'Marcel Dettmann',
          start: '07:00',
          date: '2020-03-28',
          end: '2020-03-28 08:30'
        },
        {
          name: 'Prantel',
          start: '08:30',
          date: '2020-03-28',
          end: '2020-03-28 10:30'
        },
        {
          name: 'Helena Hauff',
          start: '10:30',
          date: '2020-03-28',
          end: '2020-03-28 12:30'
        },
        {
          name: 'Randomer',
          start: '12:30',
          date: '2020-03-28',
          end: '2020-03-28 14:30'
        },
        {
          name: 'Marie Montexier',
          start: '14:30',
          date: '2020-03-28',
          end: '2020-03-28 16:30'
        },
        {
          name: 'Ryan Elliott',
          start: '16:30',
          date: '2020-03-28',
          end: '2020-03-28 18:30'
        },
        {
          name: 'Shanti Celeste',
          start: '18:30',
          date: '2020-03-28',
          end: '2020-03-28 20:30'
        },
        {
          name: 'Don Williams',
          start: '20:30',
          date: '2020-03-28',
          end: '2020-03-28 21:30'
        },
        {
          name: 'S Ruston',
          start: '21:30',
          date: '2020-03-28',
          end: '2020-03-28 23:30'
        },
        {
          name: 'Cope',
          start: '23:30',
          date: '2020-03-28',
          end: '2020-03-29 01:30'
        },
        {
          name: 'Elissa Suckdog',
          start: '01:30',
          date: '2020-03-29',
          end: '2020-03-29 04:30'
        },
        {
          name: 'Skee Mask',
          start: '04:30',
          date: '2020-03-29',
          end: '2020-03-29 06:30'
        },
        {
          name: 'OK Williams',
          start: '06:30',
          date: '2020-03-29',
          end: '2020-03-29 07:30'
        },
        {
          name: 'O-Wells b2b 41issa',
          start: '07:30',
          date: '2020-03-29',
          end: '2020-03-29 08:30'
        },
        {
          name: 'Solid Blake',
          start: '08:30',
          date: '2020-03-29',
          end: '2020-03-29 10:30'
        },
        {
          name: 'Sybil',
          start: '10:30',
          date: '2020-03-29',
          end: '2020-03-29 12:30'
        },
        {
          name: 'Hector Oaks',
          start: '12:30',
          date: '2020-03-29',
          end: '2020-03-29 14:30'
        },
        {
          name: 'DJ Spit b2b CcC',
          start: '14:30',
          date: '2020-03-29',
          end: '2020-03-29 16:30'
        }
      ]
    }
  },
  methods: {
    checkIfEnded (endTime, index) {
      const now = moment.tz('Europe/Berlin')
      const formattedEndTime = moment.tz(endTime, 'Europe/Berlin')
      return now.isAfter(formattedEndTime)
    }
  }
}
</script>
