<template>
  <transition name="fade" mode="out-in">
    <div v-if="loaded" id="quarantaene">
      <!-- <div @click="accessDeviceMotion" style="position: fixed; top: 0px; left: 0px; padding: 1rem; background: blue; color: white; cursor:pointer;">Enable Device Motion</div> -->
      <transition name="fade" mode="out-in">
        <Menu v-if="showMenu" />
      </transition>
      <transition name="fade" mode="out-in">
        <FooterMenu v-if="showFooterMenu" />
      </transition>
      <Livestream v-if="granted" />
      <nuxt />
      <transition name="fade">
        <Timetable v-if="$store.state.oldState.showTimetable" />
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
import axios from 'axios'
import moment from 'moment-timezone'
// Components
import Menu from '../components/Menu.vue'
import FooterMenu from '../components/FooterMenu.vue'
import Livestream from '../components/Livestream.vue'
import Timetable from '../components/Timetable.vue'

export default {
  components: {
    Menu,
    FooterMenu,
    Livestream,
    Timetable
  },
  data () {
    return {
      granted: true,
      loaded: false
    }
  },
  computed: {
    showMenu () {
      return (
        this.$route.path !== '' &&
        this.$route.path !== '/' &&
        this.$route.path !== '/line' &&
        this.$route.path !== '/bouncer'
      )
    },
    showFooterMenu () {
      return this.$route.path === '/mainfloor'
    }
  },
  mounted () {
    console.log(this.$route.path)
    this.fetchData()
    // this.accessDeviceMotion()
  },
  methods: {
    fetchData () {
      // axios.get('http://localhost:8888')
      axios.get('https://cms.clubquarantaene.stream')
        .then((res) => {
          this.$store.commit('setContent', res.data.data)
          this.loaded = true
          const vm = this
          setInterval(() => {
            vm.checkIfEventIsRunning()
          }, 1000)
        })
    },
    checkIfEventIsRunning () {
      // this.$store.dispatch('content/checkIfEventIsRunning')
      const eventIsRunning = moment().tz('Europe/Berlin').isBetween(this.$store.state.content.data.event.start, this.$store.state.content.data.event.end)
      if (eventIsRunning !== this.$store.state.content.eventIsRunning) {
        this.$store.commit('setEventIsRunning', eventIsRunning)
      }
    },
    accessDeviceMotion () {
      const vm = this
      DeviceMotionEvent.requestPermission()
        .then((response) => {
          if (response === 'granted') {
            vm.granted = true
            console.log('DeviceMotion granted')
          }
        })
        .catch(console.error)
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
