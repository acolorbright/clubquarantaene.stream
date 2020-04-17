<template>
  <transition name="fade" mode="out-in">
    <div
      v-if="loaded"
      id="quarantaene"
      :class="classValue"
    >
      <div
        v-if="$route.path != '/'"
        id="rotate-screen-message"
      >
        <span>Please rotate<br>your screen!</span>
      </div>
      <transition name="fade" mode="out-in">
        <Menu v-if="showMenu" />
      </transition>
      <nuxt />
      <Livestream v-if="$store.state.questions.firstQuestionAnswered" />
      <transition name="fade">
        <Timetable v-if="$store.state.showTimetable" />
      </transition>
      <transition name="fade" mode="out-in">
        <FooterMenu v-if="showMenu && $route.name === 'mainfloor'" />
      </transition>
      <div id="imprint">
        <nuxt-link to="/imprint" class="allcaps" :class="{ 'black-type': $route.name == 'index' }">
          Imprint
        </nuxt-link>
      </div>
    </div>
  </transition>
</template>
<script>
import moment from 'moment-timezone'

import Livestream from '../components/Livestream.vue'
import Menu from '../components/Menu.vue'
import FooterMenu from '../components/FooterMenu.vue'
import Timetable from '../components/Timetable.vue'

export default {
  // async fetch ({ store, params, axios }) {
  //   const { data } = await axios.get('http://my-api/stars')
  //   store.commit('setContent', data)
  // },
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  components: { Livestream, Menu, FooterMenu, Timetable },
  data () {
    return {
      loaded: false,
      progressBars: {},
      currentTime: moment().tz('Europe/Berlin'),
      eventTime: moment.tz('2020-04-24 22:00:00', 'Europe/Berlin'),
      eventEnd: moment.tz('2020-04-26 16:30:00', 'Europe/Berlin')
    }
  },
  computed: {
    eventIsRunning () {
      return this.currentTime.isBetween(this.eventTime, this.eventEnd)
    },
    showMenu () {
      return (this.$store.state.questions.firstQuestionAnswered && (this.$route.name === 'mainfloor' || this.$route.name === 'bathroom' || this.$route.name === 'bar' || this.$route.name === 'bathroom-bathroom' || this.$route.name === 'imprint' || this.$route.name === 'cloakroom'))
    },
    classValue () {
      return `horse-${this.$store.state.horse}-snowflake-${this.$store.state.snowflake}-lightning-${this.$store.state.lightning}`
    }
  },
  watch: {
    $route (to, from) {
      this.$store.commit('showTimetable', false)
    },
    eventIsRunning (val) {
      if (!val) {
        this.$store.commit('setEventIsOver')
        this.$router.push({ path: '/' })
      }
    }
  },
  beforeMount () {
    const vm = this
    setInterval(() => {
      vm.currentTime = moment().tz('Europe/Berlin')
    }, 1000)
  },
  mounted () {
    const vm = this
    setTimeout(() => {
      vm.loaded = true
    }, 1000)
    if (!this.eventIsRunning) {
      this.$store.commit('setEventIsOver')
      if (!this.$route.name === 'bar' || !this.$route.name === 'cloakroom') {
        this.$router.push({ path: '/' })
      }
    }
  },
  sockets: {
    userCount (userCount) {
      this.$store.commit('setUsers', userCount)
    },
    getProgressBars (progressBars) {
      this.progressBars = progressBars
    }
  }
}
</script>
